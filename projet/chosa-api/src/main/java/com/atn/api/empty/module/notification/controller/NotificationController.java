package com.atn.api.empty.module.notification.controller;

import com.atn.api.empty.module.child.entity.Child;
import com.atn.api.empty.module.child.service.ChildService;
import com.atn.api.empty.module.notification.entity.Notification;
import com.atn.api.empty.module.notification.service.NotificationService;
import com.atn.api.empty.module.role.entity.Role;
import com.atn.api.empty.module.user.entity.User;
import com.atn.api.empty.module.user.service.UserService;
import com.atn.commons.controller.rest.MyRestController;
import com.atn.commons.persistence.BaseDao;
import com.atn.generator.dto.ChildDto;
import com.atn.generator.dto.NotificationDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@CrossOrigin("*")
@RequestMapping("/api/notifications")
public class NotificationController extends MyRestController<NotificationService, NotificationDto, Notification, Long> {

    @Autowired
    private UserService userService;

    @Autowired
    private ChildService childService;

    public NotificationController(@Autowired NotificationService service) {
        super(service);
    }

    @Override
    protected Notification mapperFromDto(NotificationDto notificationDto) {
        Notification notification = new Notification();
        notification.setId(notificationDto.getId());
        notification.setStatus(Notification.STATUS.valueOf(notificationDto.getStatus()));
        notification.setType(Notification.TYPE.valueOf(notificationDto.getType()));
        notification.setDestination(notificationDto.getDestination() != null ? userService.findById(notificationDto.getDestination()) : null);
        notification.setUrl(notificationDto.getUrl());
        notification.setTitle(notificationDto.getTitle());
        notification.setChild(notificationDto.getChild() != null ? childService.findById(notificationDto.getChild()) : null);
        notification.setCreationDate(notificationDto.getCreationDate());
        return notification;
    }

    @Override
    protected NotificationDto mapperToDto(Notification notification) {
        NotificationDto notificationDto = new NotificationDto();
        notificationDto.setId(notification.getId());
        notificationDto.setStatus(notification.getStatus().name());
        notificationDto.setType(notification.getType().name());
        notificationDto.setDestination(notification.getDestination() != null ? notification.getDestination().getId() : null);
        notificationDto.setUrl(notification.getUrl());
        notificationDto.setTitle(notification.getTitle());
        notificationDto.setChild(notification.getChild() != null ? notification.getChild().getId() : null);
        notificationDto.setCreationDate(notification.getCreationDate());
        return notificationDto;
    }

    @RequestMapping(value = "",method = RequestMethod.GET)
    public List<NotificationDto> getParentChildren(@RequestParam("userId") Long userId, @RequestParam(value = "status", required = false) String status, @RequestParam(value = "size") Integer size, @RequestParam(value = "offset") Integer offset) {
        User user = userService.findById(userId);
        Notification.STATUS statusType = status != null ? Notification.STATUS.valueOf(status) : null;
        Map<String, Object> map = new HashMap<>();
        map.put("=destination", user);
        map.put("creationDate#D", "");
        if (statusType != null)
            map.put("=status", statusType);
        List<Notification> notifications = service.findListByCriteria(map, size, size * offset - size, BaseDao.DELETION_STATUS.ACTIVE);
        return notifications.stream().map(notification -> mapperToDto(notification)).collect(Collectors.toList());
    }

    @RequestMapping(value = "/{id}",method = RequestMethod.PATCH)
    @Transactional
    public ResponseEntity updateNotification(@PathVariable("id") Long id, @RequestBody NotificationDto notificationDto) {
        Notification notification = service.findById(id);
        if (notification != null) {
            notification = mapperFromDto(notificationDto);
            notification = service.save(notification);
            return new ResponseEntity(mapperToDto(notification), HttpStatus.OK);
        }
        return new ResponseEntity<Child>(HttpStatus.NOT_FOUND);
    }

    @RequestMapping(value = "/maxSize", method = RequestMethod.GET)
    @ResponseBody
    public int getCenterChildren(@RequestParam(value = "userId") Long userId, @RequestParam(value = "status", required = false) String status) {
        User user = userService.findById(userId);
        Notification.STATUS statusType = status != null ? Notification.STATUS.valueOf(status) : null;
        Map<String, Object> map = new HashMap<>();
        map.put("=destination", user);
        if (statusType != null)
            map.put("=status", statusType);
        int maxSize = service.getCount(map, BaseDao.DELETION_STATUS.ACTIVE);
        return maxSize;
    }

}
