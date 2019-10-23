package com.atn.api.empty.module.user.controller;

import com.atn.api.empty.module.AuthController.AuthenticationRequest;
import com.atn.api.empty.module.child.controller.ChildController;
import com.atn.api.empty.module.file.entity.File;
import com.atn.api.empty.module.file.service.FileService;
import com.atn.api.empty.module.mail.Service.EmailService;
import com.atn.api.empty.module.notification.entity.Notification;
import com.atn.api.empty.module.notification.service.NotificationService;
import com.atn.api.empty.module.role.entity.Role;
import com.atn.api.empty.module.trainingCenter.controller.TrainingCenterController;
import com.atn.api.empty.module.trainingCenter.entity.TrainingCenter;
import com.atn.api.empty.module.user.entity.User;
import com.atn.api.empty.module.user.service.UserService;
import com.atn.commons.controller.rest.MyRestController;
import com.atn.commons.persistence.BaseDao;
import com.atn.generator.dto.ChildDto;
import com.atn.generator.dto.TrainingCenterDto;
import com.atn.generator.dto.UserDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import static org.springframework.http.ResponseEntity.ok;


@RestController
@CrossOrigin("*")
@RequestMapping("/api/users")
public class UserController extends MyRestController<UserService, UserDto, User, Long> {

    public UserController(@Autowired UserService userService) {
        super(userService);
    }

    public UserService getService() {
        return service;
    }

    @Autowired
    private EmailService emailService;
    @Autowired
    private PasswordEncoder passwordEncoder;
    @Autowired
    private FileService fileService;
    @Autowired
    private ChildController childController;
    @Autowired
    private TrainingCenterController trainingCenterController;

    @Autowired
    private NotificationService notificationService;

    @Override
    protected User mapperFromDto(UserDto userDto) {
        User user = new User();
        user.setId(userDto.getId());
        user.setNom(userDto.getNom());
        user.setPrenom(userDto.getPrenom());
        user.setEmail(userDto.getEmail());
        user.setStatus(User.STATUS.valueOf(userDto.getStatus()));
        user.setUserPassword(userDto.getUserPassword());
        user.setBirth_date(userDto.getBirth_date());
        user.setUser_picture_file(userDto.getUser_picture_file() != null ? fileService.findById(userDto.getUser_picture_file()) : null);
        user.setAdress(userDto.getAdress());
        user.setCountry(userDto.getCountry());
        user.setVille(userDto.getVille());
        user.setPhone(userDto.getPhone());
        user.setFacebook_Id(userDto.getFacebook_Id());
        user.setGoogle_Id(userDto.getGoogle_Id());
        return user;
    }

    @Override
    protected UserDto mapperToDto(User user) {
        if (user != null) {
            UserDto dto = new UserDto();
            dto.setId(user.getId());
            dto.setNom(user.getNom());
            dto.setPrenom(user.getPrenom());
            dto.setEmail(user.getEmail());
            dto.setStatus(user.getStatus().name());
            dto.setBirth_date(user.getBirth_date());
            dto.setUser_picture_file(user.getUser_picture_file() != null ? user.getUser_picture_file().getId() : null);
            dto.setAdress(user.getAdress());
            dto.setVille(user.getVille());
            dto.setCountry(user.getCountry());
            dto.setPhone(user.getPhone());
            dto.setFacebook_Id(user.getFacebook_Id());
            dto.setGoogle_Id(user.getGoogle_Id());
            return dto;
        } else {
            return null;
        }
    }

    @Transactional
    @PatchMapping(path = "/{id}", consumes = {MediaType.APPLICATION_JSON_UTF8_VALUE, MediaType.APPLICATION_JSON_VALUE})
    public ResponseEntity<?> userUpdate(@PathVariable("id") Long id, @RequestBody UserDto userDto) {
        Map<Object, Object> model = new HashMap<>();
        User user = service.findById(id);
        if (user != null) {
            userDto.setStatus("VALIDATE");
            user.setNom(userDto.getNom());
            user.setPrenom(userDto.getPrenom());
            user.setEmail(userDto.getEmail());
            user.setPhone(userDto.getPhone());
            user.setBirth_date(userDto.getBirth_date());
            user.setVille(userDto.getVille());
            user.setCountry(userDto.getCountry());
            user.setAdress(userDto.getAdress());
            user.setFacebook_Id(userDto.getFacebook_Id());
            user.setGoogle_Id(userDto.getGoogle_Id());
            service.save(user);
            model.put("Response", "updated successfully");
            return new ResponseEntity(mapperToDto(user), HttpStatus.OK);
        } else {
            return new ResponseEntity(new MyRestController.Response("Error"), HttpStatus.NOT_FOUND);
        }
    }

    @RequestMapping(method = RequestMethod.POST)
    public ResponseEntity<?> addUser(@RequestBody UserDto userDto) {
        User user = service.findByEmail(userDto.getEmail());
        if (user == null) {
            userDto.setStatus("SIGNUP");
            user = mapperFromDto(userDto);
            user = service.addUser(user);
            return new ResponseEntity(mapperToDto(user), HttpStatus.OK);
        } else {
            return new ResponseEntity(new MyRestController.Response("Error"), HttpStatus.NOT_FOUND);
        }
    }

    @PutMapping("/validation")
    @Transactional
    public ResponseEntity validateAccount(@RequestParam(value = "token") String
                                                  token, @RequestParam(value = "email") String email) {
        Map<Object, Object> model = new HashMap<>();
        User user = service.findByEmail(email);
        if (!user.getToken().equals(token)) {
            model.put("expired", true);
            return new ResponseEntity(ok(model), HttpStatus.UNAUTHORIZED);
        } else {
            if (user.hasRole(Role.ROLE.PARENT))
                user.setStatus(User.STATUS.VALIDATE);
            else user.setStatus(User.STATUS.SUSPENDED);
            service.save(user);
            model.put("expired", false);
//        }
            return ok(model);
        }
    }

    @PatchMapping("/forgot-password")
    @Transactional
    public ResponseEntity forgetPassword(@RequestParam(value = "token") String
                                                 token, @RequestBody AuthenticationRequest data) {
        Map<Object, Object> model = new HashMap<>();
        User user = service.findByEmail(data.getEmail());
        String userToken = user.getToken();
        model.put("user", user);
        model.put("token", userToken);
        model.put("expired", true);
        if (userToken.equals(token)) {
            user.setUserPassword(passwordEncoder.encode(data.getUserPassword()));
            service.save(user);
            model.put("expired", false);
            model.put("reset", true);
        }
        return new ResponseEntity(ok(model), HttpStatus.OK);
    }

    @GetMapping("/{id}/children")
    public List<ChildDto> getParentChildren(@PathVariable Long id) {
        User parent = service.findById(id);
        return childController.getParentChildren(parent);
    }

    @RequestMapping(value = "/reset-password", method = RequestMethod.POST)
    public ResponseEntity sendForgetPasswordMail(@RequestParam("email") String email) throws Exception {
        User user = service.findByEmail(email);
        emailService.sendForgetPasswordMail(user);
        return new ResponseEntity(new MyRestController.Response("Success operattion"), HttpStatus.OK);
    }

    @RequestMapping(value = "/verify-token", method = RequestMethod.POST)
    public UserDto verifyToken(@RequestBody UserDto userDto, @RequestParam String token) throws Exception {
        User user = service.findByEmail(userDto.getEmail());
        if (!user.getToken().equals(token))
            throw new Exception("Invalid or expired token");
        return mapperToDto(user);
    }

    @RequestMapping(value = "/facebook", method = RequestMethod.GET)
    public ResponseEntity<?> findUserByFacebookId(@RequestParam("facebookId") String facebookId) {
        User user = service.getUserByFaceBookId(facebookId);
        if (user == null)
            return new ResponseEntity(new MyRestController.Response("User not Found"), HttpStatus.NOT_FOUND);
        return new ResponseEntity(mapperToDto(user), HttpStatus.OK);
    }

    @RequestMapping(value = "/{id}/reset-password", method = RequestMethod.PATCH)
    @Transactional
    public ResponseEntity updatePassword(@RequestBody UserDto userDto, @PathVariable Long id) {
        User user = service.findById(id);
        BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
        user.setUserPassword(passwordEncoder.encode(userDto.getUserPassword()));
        service.save(user);
        return new ResponseEntity(new MyRestController.Response("Success operation"), HttpStatus.OK);
    }

    @RequestMapping(value = "/{id}/update-password", method = RequestMethod.PATCH)
    @Transactional
    public ResponseEntity updateProfilPassword(@RequestBody UserDto userDto, @PathVariable Long id, @RequestParam("oldPassword") String oldPassword) {
        User user = service.findById(id);
        BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
        if (!passwordEncoder.matches(oldPassword, user.getUserPassword())) {
            return new ResponseEntity(new MyRestController.Response("Password doesn't match"), HttpStatus.FORBIDDEN);
        }

        user.setUserPassword(passwordEncoder.encode(userDto.getUserPassword()));
        service.save(user);
        return new ResponseEntity(new MyRestController.Response("Success operation"), HttpStatus.OK);
    }

    @Transactional
    @RequestMapping(value = "/{id}/centers", method = RequestMethod.GET)
    public TrainingCenterDto getCenterByUserId(@PathVariable("id") Long id) {
        User user = service.findById(id);
        TrainingCenter trainingCenter = user.getTrainingCentre();

        return trainingCenterController.get(trainingCenter.getId());
    }


    @PostMapping("/contact")
    public ResponseEntity sendContactMail(@RequestParam(value = "email") String email,
           @RequestParam(value = "message") String message, @RequestParam(value = "name") String name) throws IOException {
        List<User> users = service.getUsers(Role.ROLE.ADMIN, User.STATUS.VALIDATE, null, 0);
        for (User user : users) {
            emailService.sendContactMail(user, email, name, message);
            String title = "Un email reçu. Veuillez vérifier votre boite mail";
            notificationService.sendAdminNotification(user, Notification.TYPE.CONTACT, null, title);
        }
        return new ResponseEntity(new MyRestController.Response("Success operation"), HttpStatus.OK);
    }

    @RequestMapping(value = "/{id}/files", method = RequestMethod.PATCH)
    @Transactional
    public UserDto addFileToUser(@RequestPart(value = "file") MultipartFile multipartFile, @PathVariable Long id) {
        File file = fileService.uploadMultipartFile(multipartFile);
        User user = service.findById(id);
        user.setUser_picture_file(file);
        user = service.save(user);
        return mapperToDto(user);
    }

    @RequestMapping(value = "/verifyTokenNotExpired", method = RequestMethod.GET)
    public ResponseEntity verifyTokenNotExpired() {
        User user = service.getConnectedUser();
        if (user != null)
            return new ResponseEntity(new MyRestController.Response("Success operation"), HttpStatus.OK);
        return new ResponseEntity(new MyRestController.Response("Error"), HttpStatus.METHOD_NOT_ALLOWED);
    }

    @RequestMapping(value = "", method = RequestMethod.GET, produces = {"application/json"})
    public ResponseEntity getAllUsers(@RequestParam(value = "role") String role, @RequestParam(value = "status", required = false) String status
            , @RequestParam("offset") int offset, @RequestParam("size") int size) {
        int start = size * offset - size;
        List<User> users = service.getUsers(Role.ROLE.valueOf(role), status != null ? User.STATUS.valueOf(status) : null, size, start);
        List<UserDto> userDtos = users.stream().map(user -> mapperToDto(user)).collect(Collectors.toList());
        return new ResponseEntity(userDtos, HttpStatus.OK);
    }

    @RequestMapping(value = "/{id}/status", method = RequestMethod.PATCH)
    @Transactional
    public ResponseEntity validateEcole(@RequestBody UserDto userDto, @PathVariable Long id) {
        User user = service.findById(id);
        User.STATUS status = User.STATUS.valueOf(userDto.getStatus());
        user.setStatus(status);
        user = service.save(user);
        emailService.sendNotificationMail(user);
        return new ResponseEntity(mapperToDto(user), HttpStatus.OK);
    }

    @RequestMapping(value = "/maxSize", method = RequestMethod.GET)
    @ResponseBody
    public int getCenterChildren(@RequestParam(value = "role") String role, @RequestParam(value = "status", required = false) String status) {
        Role.ROLE roleType = Role.ROLE.valueOf(role);
        User.STATUS statusType = status != null ? User.STATUS.valueOf(status) : null;
        Map<String, Object> map = new HashMap<>();
        map.put("=roles.role", roleType);
        if (statusType != null)
            map.put("=status", statusType);
        int maxSize = service.getCount(map, BaseDao.DELETION_STATUS.ACTIVE);
        return maxSize;
    }


}
