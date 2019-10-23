package com.atn.api.empty.module.mail.Service;

import com.atn.api.empty.module.user.entity.User;

import java.io.IOException;

public interface EmailService {

    void sendValidationMail(User user) throws IOException;

    void sendForgetPasswordMail(User user) throws Exception;

    void sendContactMail(User admin, String email, String name, String message) throws IOException;

    void sendNotificationMail(User user);
}
