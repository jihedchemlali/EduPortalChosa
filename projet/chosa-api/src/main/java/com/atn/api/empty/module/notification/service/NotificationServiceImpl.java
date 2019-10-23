package com.atn.api.empty.module.notification.service;

import com.atn.api.empty.module.child.entity.Child;
import com.atn.api.empty.module.notification.dao.NotificationDao;
import com.atn.api.empty.module.notification.entity.Notification;
import com.atn.api.empty.module.user.entity.User;
import com.atn.commons.persistence.BaseDao;
import com.atn.commons.service.MyAbstractService;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Component
public class NotificationServiceImpl extends MyAbstractService<Notification, Long> implements NotificationService {
    public NotificationServiceImpl(NotificationDao notificationDao) {
        super(notificationDao);
    }

    @Value("${app.url.value}")
    private String URL;

    @Override
    protected NotificationDao getDataAccessObject() {
        return (NotificationDao) this.dataAccessObject;
    }

    @Override
    @Transactional
    public Notification updateNotificationStatus(Notification notification, Notification.STATUS status) {
        notification.setStatus(status);
        return save(notification);
    }

    private Notification declareNotification(User destination, Notification.TYPE type, String url, String title, Child child) {
        Notification notification = new Notification();
        notification.setStatus(Notification.STATUS.NON_LUS);
        notification.setType(type);
        notification.setDestination(destination);
        if (url != null)
            notification.setUrl(URL + url);
        notification.setTitle(title);
        notification.setChild(child);
        notification = save(notification);
        return notification;
    }

    private void cancelNotification(Child child, Notification.TYPE type) {
        Map<String, Object> map = new HashMap<>();
        if (child != null)
            map.put("=child", child);
        if (type != null)
            map.put("=type", type);
        List<Notification> result = findListByCriteria(map, null, 0, BaseDao.DELETION_STATUS.ACTIVE);
        result.forEach(notification -> delete(notification));
    }

    @Override
    @Transactional
    public void handleChildNotification(User destination, String url, String title, Child child) {
        if (child.getStatus() == Child.STATUS.ONLOAD) {
            declareNotification(destination, Notification.TYPE.CREATION, url, title, child);
        } else if (child.getStatus() == Child.STATUS.ACCEPTED) {
            declareNotification(destination, Notification.TYPE.ACCEPTATION, url, title, child);
        } else if (child.getStatus() == Child.STATUS.REFUSED) {
            declareNotification(destination, Notification.TYPE.REFUSE, url, title, child);
        } else if (child.getStatus() == Child.STATUS.NEW) {
            cancelNotification(child, Notification.TYPE.CREATION);
        }
    }

    @Override
    @Transactional
    public Notification sendAdminNotification(User destination, Notification.TYPE type, String url, String title) {
        return declareNotification(destination, type, url, title, null);
    }

}
