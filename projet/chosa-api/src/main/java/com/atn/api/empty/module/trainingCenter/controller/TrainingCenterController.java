package com.atn.api.empty.module.trainingCenter.controller;

import com.atn.api.empty.module.child.controller.ChildController;
import com.atn.api.empty.module.child.entity.Child;
import com.atn.api.empty.module.child.service.ChildService;
import com.atn.api.empty.module.file.entity.File;
import com.atn.api.empty.module.file.service.FileService;
import com.atn.api.empty.module.role.entity.Role;
import com.atn.api.empty.module.trainingCenter.entity.TrainingCenter;
import com.atn.api.empty.module.trainingCenter.service.TrainingCenterService;
import com.atn.api.empty.module.user.entity.User;
import com.atn.api.empty.module.user.service.UserService;
import com.atn.commons.controller.rest.MyRestController;
import com.atn.commons.persistence.BaseDao;
import com.atn.generator.dto.ChildDto;
import com.atn.generator.dto.TrainingCenterDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.*;
import java.util.stream.Collectors;

@RestController
@CrossOrigin("*")
@RequestMapping("/api/centers")
public class TrainingCenterController extends MyRestController<TrainingCenterService, TrainingCenterDto, TrainingCenter, Long> {

    @Autowired
    UserService userService;
    @Autowired
    FileService fileService;
    @Autowired
    ChildService childService;
    @Autowired
    ChildController childController;

    public TrainingCenterController(TrainingCenterService trainingCenterService) {
        super(trainingCenterService);
    }

    public TrainingCenterService getService() {
        return service;
    }

    @Override
    protected TrainingCenter mapperFromDto(TrainingCenterDto trainingCenterDto) {
        TrainingCenter trainingCenter = new TrainingCenter();
        trainingCenter.setId(trainingCenterDto.getId());
        Long userId = trainingCenterDto.getManager();
        User user = userService.findById(userId);
        trainingCenter.setManager(user);
        trainingCenter.setManager(trainingCenterDto.getManager() != null ? userService.findById(trainingCenterDto.getManager()) : null);
        trainingCenter.setStatus(TrainingCenter.STATUS.valueOf(trainingCenterDto.getStatus()));
        trainingCenter.setLogo(trainingCenterDto.getLogo()!=null?fileService.findById(trainingCenterDto.getLogo()): null);
        trainingCenter.setName(trainingCenterDto.getName());
        trainingCenter.setPhone(trainingCenterDto.getPhone());
        trainingCenter.setCountry(trainingCenterDto.getCountry());
        trainingCenter.setAddress(trainingCenterDto.getAddress());
        trainingCenter.setVille(trainingCenterDto.getVille());
        trainingCenter.setFoundationDay(trainingCenterDto.getFoundationDay());
        return trainingCenter;
    }

    @Override
    public TrainingCenterDto mapperToDto(TrainingCenter trainingCenter) {
        TrainingCenterDto trainingCenterDto = new TrainingCenterDto();
        trainingCenterDto.setId(trainingCenter.getId());
        trainingCenterDto.setAddress(trainingCenter.getAddress());
        trainingCenterDto.setVille(trainingCenter.getVille());
        trainingCenterDto.setName(trainingCenter.getName());
        trainingCenterDto.setStatus(trainingCenter.getStatus().name());
        trainingCenterDto.setCountry(trainingCenter.getCountry());
        trainingCenterDto.setPhone(trainingCenter.getPhone());
        trainingCenterDto.setFoundationDay(trainingCenter.getFoundationDay());
        trainingCenterDto.setLogo(trainingCenter.getLogo() != null ? trainingCenter.getLogo().getId() : null);
        trainingCenterDto.setManager(trainingCenter.getManager() != null ? trainingCenter.getManager().getId() : null);
        return trainingCenterDto;
    }


    @Transactional
    @RequestMapping(value = "/{id}", method = RequestMethod.PATCH)
    public ResponseEntity<?> trainingCenterUpdate(@PathVariable("id") Long id, @RequestBody TrainingCenterDto trainingCenterDto) {
        TrainingCenter trainingCenter = service.findById(id);
        if (trainingCenter != null) {

            trainingCenter = mapperFromDto(trainingCenterDto);
            trainingCenter = service.save(trainingCenter);
            return new ResponseEntity(mapperToDto(trainingCenter), HttpStatus.OK);
        } else {
            return new ResponseEntity(new MyRestController.Response("Error"), HttpStatus.NOT_FOUND);
        }
    }

    @Transactional
    @RequestMapping(value = "/{id}/informations", method = RequestMethod.PATCH)
    public ResponseEntity<?> trainingCenterUpdateNameDate(@PathVariable("id") Long id, @RequestBody TrainingCenterDto trainingCenterDto) {
        TrainingCenter trainingCenter = service.findById(id);
        if (trainingCenter != null) {

            trainingCenter.setName(trainingCenterDto.getName());
            trainingCenter.setCountry(trainingCenterDto.getCountry());
            trainingCenter.setAddress(trainingCenterDto.getAddress());
            trainingCenter.setVille(trainingCenterDto.getVille());
            trainingCenter.setPhone(trainingCenterDto.getPhone());
            trainingCenter.setFoundationDay(trainingCenterDto.getFoundationDay());
            trainingCenter = service.save(trainingCenter);
            return new ResponseEntity(mapperToDto(trainingCenter), HttpStatus.OK);
        } else {
            return new ResponseEntity(new MyRestController.Response("Error"), HttpStatus.NOT_FOUND);
        }
    }

    @RequestMapping(value = "", method = RequestMethod.POST)
    @Transactional
    public TrainingCenterDto createEcole(@RequestBody TrainingCenterDto trainingCenterDto) {
        TrainingCenter trainingCenter = mapperFromDto(trainingCenterDto);
        trainingCenter = service.save(trainingCenter);
        return mapperToDto(trainingCenter);
    }


    @RequestMapping(value = "/{id}/files", method = RequestMethod.PATCH)
    @Transactional
    public ResponseEntity<?> addFileToEcole(@RequestPart(value = "file", required = false) MultipartFile multipartFile, @PathVariable Long id) throws IOException {
        File file = fileService.uploadMultipartFile(multipartFile);
        TrainingCenter trainingCenter = service.findById(id);
        if (trainingCenter != null) {
            trainingCenter.setLogo(file);
            service.save(trainingCenter);
            return new ResponseEntity(mapperToDto(trainingCenter), HttpStatus.OK);
        } else {
            return new ResponseEntity(new MyRestController.Response("Error"), HttpStatus.NOT_FOUND);
        }
    }

    public ResponseEntity getChildCenter(Child child) {
        TrainingCenter trainingCenter = child.getTrainingCenter();
        return new ResponseEntity(trainingCenter != null ? mapperToDto(trainingCenter) : null, HttpStatus.OK);
    }

//    @GetMapping("/{id}/children")
//    public List<ChildDto> getCenterChildren(@PathVariable Long id) {
//        TrainingCenter trainingCenter = service.findById(id);
//        return childController.getCenterChildren(trainingCenter);
//    }


    @RequestMapping(value = "/{id}/children", method = RequestMethod.GET)
    @ResponseBody
    public List<ChildDto> getCenterChildren(@PathVariable("id") Long id, @RequestParam("offset") int offset, @RequestParam("size") int size) {
        Map<String, Object> map = new HashMap<>();
        int start = size * offset - size;
        map.put("=trainingCenter.id", id);
        List<Child> children = childService.findListByCriteria(map, size, start, BaseDao.DELETION_STATUS.ACTIVE);
        List<ChildDto> dtos = children.stream().map(child -> childController.mapperToDto(child)).collect(Collectors.toList());
        return dtos;
    }

    @RequestMapping(value = "/{id}/children/maxSize", method = RequestMethod.GET)
    @ResponseBody
    public int getCenterChildren(@PathVariable("id") Long id) {
        Map<String, Object> map = new HashMap<>();
        map.put("=trainingCenter.id", id);
        int maxSize = childService.getCount(map, BaseDao.DELETION_STATUS.ACTIVE);
        return maxSize;
    }

    @GetMapping(path = {"/search"})
    @ResponseBody
    public List<TrainingCenterDto> getCenterByName(@RequestParam("name") String name, @RequestParam("offset") int offset, @RequestParam("size") int size) {
        return searchCenterByName(name, offset, size);
    }


    private List<TrainingCenterDto> searchCenterByName(String name, int offset, int size) {
        Map<String, Object> map = new HashMap<>();
        int start = size * offset - size;
        map.put("%name%", name);
        List<TrainingCenterDto> dtos = new ArrayList<>();
        List<TrainingCenter> trainingCenters;
        if(offset==0&&size==0)
         trainingCenters = service.findListByCriteria(map, null, 0, BaseDao.DELETION_STATUS.ACTIVE);
        else trainingCenters = service.findListByCriteria(map, size, start, BaseDao.DELETION_STATUS.ACTIVE);
        for (int i = 0; i < trainingCenters.size(); i++) {
            dtos.add(mapperToDto(trainingCenters.get(i)));
        }
        return dtos;
    }


}
