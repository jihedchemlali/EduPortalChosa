package com.atn.api.empty.module.child.controller;

import com.atn.api.empty.module.actualityChild.controller.ActualityChildController;
import com.atn.api.empty.module.child.entity.Child;
import com.atn.api.empty.module.child.service.ChildService;
import com.atn.api.empty.module.file.entity.File;
import com.atn.api.empty.module.file.service.FileService;
import com.atn.api.empty.module.notification.entity.Notification;
import com.atn.api.empty.module.notification.service.NotificationService;
import com.atn.api.empty.module.trainingCenter.controller.TrainingCenterController;
import com.atn.api.empty.module.trainingCenter.entity.TrainingCenter;
import com.atn.api.empty.module.trainingCenter.service.TrainingCenterService;
import com.atn.api.empty.module.user.entity.User;
import com.atn.api.empty.module.user.service.UserService;
import com.atn.commons.controller.rest.MyRestController;
import com.atn.generator.dto.ActualityChildDto;
import com.atn.generator.dto.ChildDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;


@RestController
@CrossOrigin("*")
@RequestMapping("/api/children")
public class ChildController extends MyRestController<ChildService, ChildDto, Child, Long> {

    @Autowired
    private FileService fileService;

    @Autowired
    private UserService userService;

    @Autowired
    private ActualityChildController actualityChildController;

    @Autowired
    private TrainingCenterController trainingCenterController;

    @Autowired
    private TrainingCenterService trainingCenterService;

    @Autowired
    private NotificationService notificationService;

    public ChildController(@Autowired ChildService childService) {
        super(childService);
    }

    public ChildService getService() {
        return service;
    }

    @Override
    protected Child mapperFromDto(ChildDto childDto) {
        Child child = new Child();
        child.setId(childDto.getId());
        child.setBirth_date(childDto.getBirth_date());
        child.setPrenom(childDto.getPrenom());
        child.setPicture(childDto.getPicture() != null ? fileService.findById(childDto.getPicture()) : null);
        child.setSexe(Child.SEXE.valueOf(childDto.getSexe()));
        child.setStatus(Child.STATUS.valueOf(childDto.getStatus()));
        child.setParent(childDto.getParent() != null ? userService.findById(childDto.getParent()) : null);
        child.setTrainingCenter(childDto.getTrainingCenter() != null ? trainingCenterService.findById(childDto.getTrainingCenter()) : null);
        return child;
    }

    @Override
    public ChildDto mapperToDto(Child child) {
        ChildDto childDto = new ChildDto();
        childDto.setId(child.getId());
        childDto.setBirth_date(child.getBirth_date());
        childDto.setPrenom(child.getPrenom());
        childDto.setPicture(child.getPicture() != null ? child.getPicture().getId() : null);
        childDto.setParent(child.getParent() != null ? child.getParent().getId() : null);
        childDto.setTrainingCenter(child.getTrainingCenter() != null ? child.getTrainingCenter().getId() : null);
        childDto.setSexe(child.getSexe().name());
        childDto.setCode(child.getCode());
        childDto.setStatus(child.getStatus().name());
        return childDto;
    }


    @PatchMapping(value = "/{id}")
    @Transactional
    public ResponseEntity<?> childUpdate(@PathVariable("id") Long id, @RequestBody ChildDto childDto, @RequestParam(value = "centerId", required = false) Long centerId, @RequestParam(value = "notify", required = false) String notify) {
        TrainingCenter trainingCenter = null;
        Child child = service.findById(id);
        if (centerId != null)
            trainingCenter = trainingCenterService.findById(centerId);
        if (child != null) {
            child = mapperFromDto(childDto);

           if(notify !=null){
               if (child.getStatus().equals(Child.STATUS.REFUSED)) {
                   String url = "/parent/enfants/" + child.getId();
                   String title = "La demande d'ajout de " + child.getPrenom().toUpperCase() + " a été refusée";
                   notificationService.handleChildNotification(child.getParent(), url, title, child);
               }
               if (child.getStatus().equals(Child.STATUS.ACCEPTED)) {
                   String url = "/parent/enfants/" + child.getId();
                   String title = "La demande d'ajout de " + child.getPrenom().toUpperCase() + " a été accepté";
                   notificationService.handleChildNotification(child.getParent(), url, title, child);
               }
           }

            child.setTrainingCenter(trainingCenter);
            child = service.save(child);
            return new ResponseEntity(mapperToDto(child), HttpStatus.OK);
        }
        return new ResponseEntity<Child>(HttpStatus.NOT_FOUND);
    }

    public List<ChildDto> getParentChildren(User parent) {
        if (parent != null) {
            Set<Child> children = parent.getChildren();
            List<ChildDto> childDtosList = new ArrayList<>();
            for (Child child : children) {
                childDtosList.add(mapperToDto(child));
            }
            return childDtosList;
        } else {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Parent  Not Found");
        }
    }

    @RequestMapping(value = "", method = RequestMethod.POST)
    @Transactional
    public ChildDto createChild(@RequestBody ChildDto childDto) {
        childDto.setStatus(Child.STATUS.NEW.name());
        Child child = mapperFromDto(childDto);
        User user = userService.getConnectedUser();
        child.setParent(user);
        child = service.save(child);
        child.setCode(generateCode(child));
        child = service.save(child);
        return mapperToDto(child);
    }

    @RequestMapping(value = "/{id}/files", method = RequestMethod.PATCH)
    @Transactional
    public ResponseEntity addFileToChild(@RequestPart(value = "file", required = false) MultipartFile multipartFile, @PathVariable Long id) {
        Child child = service.findById(id);
        if (child != null) {
            File file = fileService.uploadMultipartFile(multipartFile);
            child.setPicture(file);
            service.save(child);
            return new ResponseEntity(mapperToDto(child), HttpStatus.OK);
        } else {
            return new ResponseEntity(new MyRestController.Response("Error"), HttpStatus.NOT_FOUND);
        }
    }

    @RequestMapping(value = "/{id}/centers", method = RequestMethod.GET)
    public ResponseEntity getChildCenter(@PathVariable("id") Long id) {
        Child child = service.findById(id);
        return trainingCenterController.getChildCenter(child);
    }

    private String generateCode(Child child) {
        Character c = child.getPrenom().charAt(0);
        String code = "#" + child.getPrenom().charAt(0) + userService.getConnectedUser().getNom().charAt(0) + String.format("%06d", child.getId());
        return "#" + child.getPrenom().charAt(0) + userService.getConnectedUser().getNom().charAt(0) + String.format("%06d", child.getId());
    }

    @RequestMapping(value = "/{childId}/centers", method = RequestMethod.PATCH)
    @Transactional
    public ChildDto addChildToCenter(@RequestBody ChildDto childDto, @RequestParam(value = "centerId", required = false) Long centerId, @PathVariable Long childId) {
        TrainingCenter trainingCenter = null;
        if (centerId != null) {
            trainingCenter = trainingCenterService.findById(centerId);
        }
        Child child = service.findById(childId);
        child.setTrainingCenter(trainingCenter);
        child.setStatus(Child.STATUS.valueOf(childDto.getStatus()));
        child = service.save(child);
        String url = null;
        String title = null;
        User destination = null;
        if (trainingCenter != null && child.getStatus() == Child.STATUS.ONLOAD) {
            url = "/ecole/enfants/" + child.getId();
            title = "Demande d'acceptation pour l'enfant " + child.getPrenom() + " " + child.getParent().getNom().toUpperCase();
            destination = trainingCenter.getManager();
        }
        if(child.getStatus() == Child.STATUS.REFUSED){
            String aaaaa = null;
        }
        if(child.getStatus() == Child.STATUS.ACCEPTED){
            String aaaaa = null;
        }
        notificationService.handleChildNotification(destination, url, title, child);
        return mapperToDto(child);
    }

    @RequestMapping(value = "/{id}/actualities", method = RequestMethod.GET)
    public List<ActualityChildDto> getActualitiesOfChild(@PathVariable("id") Long id) {
        return actualityChildController.getActualityByChildId(id);
    }

    @RequestMapping(value = "/{childId}/centers", method = RequestMethod.DELETE)
    @Transactional
    public ResponseEntity removeChildFromEcole(@PathVariable Long childId) {
        Child child = service.findById(childId);
        if (child != null) {
            child.setStatus(Child.STATUS.REFUSED);
            child.setTrainingCenter(null);
            service.save(child);
            return new ResponseEntity(new MyRestController.Response("Success operation"), HttpStatus.OK);
        } else
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

//    @RequestMapping(value = "/{id}/actualities", method = RequestMethod.GET)
//    @ResponseBody
//    public List<ActualityChildDto> getActualitiesChild(@PathVariable("id") Long id, @RequestParam("offset") int offset, @RequestParam("size") int size) {
//        Map<String, Object> map = new HashMap<>();
//
//        int start = size * offset - size;
//        map.put("=child.id", id);
//        List<ActualityChildDto> dtos = new ArrayList<>();
//        List<ActualityChild> actualityChildren = actualityChildService.findListByCriteria(map, size, start, BaseDao.DELETION_STATUS.ACTIVE);
//
//        for (int i = 0; i < actualityChildren.size(); i++) {
//            dtos.add(actualityChildController.mapperToDto(actualityChildren.get(i)));
//        }
//
//
//        return dtos;
//    }
}
