package com.atn.api.empty.module.AuthController;

import com.atn.api.empty.config.jwt.JwtTokenProvider;
import com.atn.api.empty.module.user.controller.UserController;
import com.atn.api.empty.module.user.entity.User;
import com.atn.api.empty.module.user.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

import static org.springframework.http.ResponseEntity.ok;


@RestController
@CrossOrigin("*")
@RequestMapping("/api/authenticate")
public class AuthController {


    @Autowired
    AuthenticationManager authenticationManager;

    @Autowired
    JwtTokenProvider jwtTokenProvider;

    @Autowired
    UserService userService;

    @Autowired
    UserController userController;

    @PostMapping("/signin")
    public ResponseEntity signin(@RequestBody AuthenticationRequest data) {

        Map<Object, Object> model = new HashMap<>();
        User user = userService.findByEmail(data.getEmail());
        if (user == null) {
            return new ResponseEntity(HttpStatus.NOT_FOUND);
        }
        try {
            String email = data.getEmail();
            if (data.getFacebookId() == null && data.getUserPassword() != null) {
                Authentication auth;
                try {
                    auth = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(email, data.getUserPassword()));
                } catch (Exception e) {
                    return new ResponseEntity(HttpStatus.FORBIDDEN);
                }
                if (!auth.isAuthenticated() || !user.getStatus().name().equals(User.STATUS.VALIDATE.name())) {
                    return new ResponseEntity(HttpStatus.UNAUTHORIZED);
                }
            }
            String token = jwtTokenProvider.createToken(user.getId(), email, user.getRoles());
            model.put("email", email);
            model.put("token", token);
            if (user.getUser_picture_file() != null)
                model.put("picture", user.getUser_picture_file().getId());
            return new ResponseEntity(model, HttpStatus.OK);
        } catch (AuthenticationException e) {
            throw new BadCredentialsException("Invalid username/password supplied");
        }
    }

    @PostMapping("/logout")
    public ResponseEntity currentUser(@AuthenticationPrincipal UserDetails userDetails) {

        if (userDetails != null) {
            Map<Object, Object> model = new HashMap<>();
            model.put("logout", "success");
            return ok(model);
        }
        Map<Object, Object> model = new HashMap<>();
        model.put("logout", "failed");
        return ok(model);
    }
}
