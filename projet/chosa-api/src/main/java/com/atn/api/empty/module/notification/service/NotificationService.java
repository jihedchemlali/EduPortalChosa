package com.atn.api.empty.module.notification.service;

import com.atn.api.empty.module.child.entity.Child;
import com.atn.api.empty.module.notification.entity.Notification;
import com.atn.api.empty.module.user.entity.User;
import com.atn.commons.service.MyService;
import org.springframework.transaction.annotation.Transactional;

public interface NotificationService extends MyService<Notification, Long> {
    @Transactional
    Notification updateNotificationStatus(Notification notification, Notification.STATUS status);

    void handleChildNotification(User destination, String url, String title, Child child);

    Notification sendAdminNotification(User destination, Notification.TYPE type, String url, String title);
}
