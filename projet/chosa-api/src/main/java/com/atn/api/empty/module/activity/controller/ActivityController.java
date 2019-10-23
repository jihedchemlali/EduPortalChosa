package com.atn.api.empty.module.activity.controller;


import com.atn.api.empty.module.activity.entity.Activity;
import com.atn.api.empty.module.activity.service.ActivityService;
import com.atn.api.empty.module.file.entity.File;
import com.atn.api.empty.module.file.service.FileService;
import com.atn.commons.controller.rest.MyRestController;
import com.atn.commons.persistence.BaseDao;
import com.atn.generator.dto.ActivityDto;
import com.atn.generator.dto.FileDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import static org.springframework.http.ResponseEntity.ok;


@RestController
@CrossOrigin("*")
@RequestMapping("/api/activities")
public class ActivityController extends MyRestController<ActivityService, ActivityDto, Activity, Long> {

    @Autowired
    ActivityService activityService;

    @Autowired
    FileService fileService;

    public ActivityController(@Autowired ActivityService activityService) {
        super(activityService);
    }

    public ActivityService getService() {
        return service;
    }

    @Override
    protected Activity mapperFromDto(ActivityDto activityDto) {
        Activity activity = new Activity();
        activity.setId(activityDto.getId());
        activity.setAge(activityDto.getAge());
        activity.setStatus(Activity.STATUS.valueOf(activityDto.getStatus()));
        activity.setDate_publication(activityDto.getDate_publication());
        activity.setFile(activityDto.getFile() != null ? fileService.findById(activityDto.getFile()) : null);
        return activity;
    }

    @Override
    protected ActivityDto mapperToDto(Activity activity) {
        ActivityDto activityDto = new ActivityDto();
        activityDto.setId(activity.getId());
        activityDto.setAge(activity.getAge());
        activityDto.setStatus(activity.getStatus().name());
        activityDto.setDate_publication(activity.getDate_publication());
        activityDto.setFile(activity.getFile() != null ? activity.getFile().getId() : null);
        return activityDto;
    }

    @PatchMapping(path = "/{id}", consumes = {MediaType.APPLICATION_JSON_UTF8_VALUE, MediaType.APPLICATION_JSON_VALUE})
    @Transactional
    public ResponseEntity<?> updateActivity(@PathVariable("id") Long id, @RequestBody ActivityDto activityDto) throws Exception {
        Map<Object, Object> model = new HashMap<>();
        Activity activity = service.findById(id);
        if (activity != null) {
            activity = mapperFromDto(activityDto);
            activity = service.save(activity);
            model.put("Response", "updated successfully");
            return new ResponseEntity(mapperToDto(activity), HttpStatus.OK);
        } else {
            return new ResponseEntity(new MyRestController.Response("Error"), HttpStatus.NOT_FOUND);
        }
    }


    @RequestMapping(value = "", method = RequestMethod.POST)
    @Transactional
    public ActivityDto createChild(@RequestBody ActivityDto activityDto) {
        Activity activity = mapperFromDto(activityDto);
        activity = service.save(activity);
        return mapperToDto(activity);
    }

    @RequestMapping(value = "/{id}/files", method = RequestMethod.PATCH)
    @Transactional
    public ResponseEntity addFileToActivity(@RequestPart(value = "file") MultipartFile multipartFile, @PathVariable Long id) {
        Activity activity = service.findById(id);
        if (activity != null) {
            File file = fileService.uploadMultipartFile(multipartFile);
            activity.setFile(file);
            activity = service.save(activity);
            return new ResponseEntity(mapperToDto(activity), HttpStatus.OK);
        } else {
            return new ResponseEntity(new MyRestController.Response("Error"), HttpStatus.NOT_FOUND);
        }
    }

    @RequestMapping(value = "/maxSize", method = RequestMethod.GET)
    @ResponseBody
    public int getSizeActivities() {
        Map<String, Object> map = new HashMap<>();
        int maxSize = service.getCount(map, BaseDao.DELETION_STATUS.ACTIVE);
        return maxSize;
    }
}



