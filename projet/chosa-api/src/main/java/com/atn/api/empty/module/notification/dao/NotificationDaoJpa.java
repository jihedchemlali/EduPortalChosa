package com.atn.api.empty.module.notification.dao;

import com.atn.api.empty.module.notification.entity.Notification;
import com.atn.commons.persistence.jpa.BaseDaoJpa;
import org.springframework.stereotype.Component;

@Component
public class NotificationDaoJpa extends BaseDaoJpa<Notification, Long> implements NotificationDao {
    public NotificationDaoJpa() {
        super(Notification.class);
    }
}
