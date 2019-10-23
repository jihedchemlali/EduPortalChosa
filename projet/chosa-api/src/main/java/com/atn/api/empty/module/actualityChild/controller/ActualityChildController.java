package com.atn.api.empty.module.actualityChild.controller;


import com.atn.api.empty.module.actualityChild.entity.ActualityChild;
import com.atn.api.empty.module.actualityChild.service.ActualityChildService;
import com.atn.api.empty.module.child.entity.Child;
import com.atn.api.empty.module.child.service.ChildService;
import com.atn.api.empty.module.file.entity.File;
import com.atn.api.empty.module.file.service.FileService;
import com.atn.api.empty.module.trainingCenter.entity.TrainingCenter;
import com.atn.api.empty.module.user.entity.User;
import com.atn.api.empty.module.user.service.UserService;
import com.atn.commons.controller.rest.MyRestController;
import com.atn.generator.dto.ActualityChildDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;

import java.io.IOException;
import java.util.*;


@RestController
@CrossOrigin("*")
@RequestMapping("/api/actualities")
public class ActualityChildController extends MyRestController<ActualityChildService, ActualityChildDto, ActualityChild, Long> {

    @Autowired
    ChildService childService;
    @Autowired
    FileService fileService;
    @Autowired
    UserService userService;

    public ActualityChildController(@Autowired ActualityChildService actualityChildService) {
        super(actualityChildService);
    }

    public ActualityChildService getService() {
        return service;
    }

    @Override
    protected ActualityChild mapperFromDto(ActualityChildDto actualityChildDto) {

        ActualityChild actualityChild = new ActualityChild();
        actualityChild.setId(actualityChildDto.getId());
        actualityChild.setCommentaire(actualityChildDto.getCommentaire());
        actualityChild.setType(ActualityChild.TYPE.valueOf(actualityChildDto.getType()));
        actualityChild.setFile(actualityChildDto.getFile() != null ? fileService.findById(actualityChildDto.getFile()) : null);
        actualityChild.setChild(actualityChildDto.getChild() != null ? childService.findById(actualityChildDto.getChild()) : null);
        actualityChild.setCreationDate(actualityChildDto.getCreationDate());
        actualityChild.setUser(actualityChildDto.getUser() != null ? userService.findById(actualityChildDto.getUser()): null);
        actualityChild.setLatitude(actualityChildDto.getLatitude());
        actualityChild.setLongitude(actualityChildDto.getLongitude());
        return actualityChild;
    }

    @Override
    public ActualityChildDto mapperToDto(ActualityChild actualityChild) {
        if (actualityChild != null) {
            ActualityChildDto dto = new ActualityChildDto();
            dto.setId(actualityChild.getId());
            dto.setCommentaire(actualityChild.getCommentaire());
            dto.setType(actualityChild.getType().name());
            dto.setFile(actualityChild.getFile() != null ? actualityChild.getFile().getId() : null);
            dto.setChild(actualityChild.getChild() != null ? actualityChild.getChild().getId() : null);
            dto.setUser(actualityChild.getUser() != null ? actualityChild.getUser().getId() : null);
            dto.setCreationDate(actualityChild.getCreationDate());
            dto.setLatitude(actualityChild.getLatitude());
            dto.setLongitude(actualityChild.getLongitude());
            return dto;
        } else {
            return null;
        }
    }


    @RequestMapping(value = "", method = RequestMethod.POST)
    @Transactional
    public ActualityChildDto addActulity(@RequestBody ActualityChildDto actualityChildDto) {
        User user = userService.getConnectedUser();
        actualityChildDto.setType(ActualityChild.TYPE.ACTIVITE.name());
        ActualityChild actualityChild = mapperFromDto(actualityChildDto);
        actualityChild.setUser(user);
        actualityChild = service.save(actualityChild);
        return mapperToDto(actualityChild);
    }

    @Transactional
    @PatchMapping(path = "/{id}", consumes = {MediaType.APPLICATION_JSON_UTF8_VALUE, MediaType.APPLICATION_JSON_VALUE})
    public ResponseEntity<?> actualityUpdate(@PathVariable("id") Long id, @RequestBody ActualityChildDto actualityChildDto) {
        ActualityChild actualityChild = service.findById(id);
        if (actualityChild != null) {
            actualityChild.setCommentaire(actualityChildDto.getCommentaire());
            actualityChild = service.save(actualityChild);
            return new ResponseEntity(mapperToDto(actualityChild), HttpStatus.OK);
        } else
            return new ResponseEntity(new MyRestController.Response("Error Actuality Not Found"), HttpStatus.NOT_FOUND);
    }


    @RequestMapping(value = "/{id}/files", method = RequestMethod.PATCH)
    @Transactional
    public ResponseEntity addFileToActuality(@RequestPart(value = "file", required = false) MultipartFile multipartFile, @PathVariable Long id) throws IOException {
        File file = fileService.uploadMultipartFile(multipartFile);
        ActualityChild actualityChild = service.findById(id);
        actualityChild.setFile(file);
        service.save(actualityChild);
        return new ResponseEntity(new MyRestController.Response("Success operation"), HttpStatus.OK);
    }


    @RequestMapping(value = "", method = RequestMethod.GET)
    public List<ActualityChildDto> getActualityByChildId(Long id) {

        Child child = childService.findById(id);
        if (child != null) {
            List<ActualityChild> actualityChildList = new ArrayList<>(child.getActualites());

            Collections.sort(actualityChildList, new Comparator<ActualityChild>() {
                public int compare(ActualityChild o1, ActualityChild o2) {
                    return (int)(o2.getCreationDate().getTime() - o1.getCreationDate().getDate());
                }
            });

            List<ActualityChildDto> actualityChildDtos = new ArrayList<>();
            for (ActualityChild actualityChild : actualityChildList) {
                actualityChildDtos.add(mapperToDto(actualityChild));
            }
            return actualityChildDtos;
        } else {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Child  Not Found");
        }
    }


}
