package com.atn.api.empty.module.mail.Service;

import com.atn.api.empty.module.user.entity.User;
import com.atn.commons.email.EmailHandler;
import com.atn.commons.utils.FileManager;
import com.atn.commons.utils.HtmlManager;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.Resource;
import org.springframework.stereotype.Service;

import java.io.*;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.HashMap;
import java.util.Map;
import java.util.stream.Stream;


@Service
public class EmailServiceImpl implements EmailService {

    @Autowired
    private EmailHandler emailHandler;

    @Value("${app.url.value}")
    private String appUrl;

    @Override
    public void sendValidationMail(User user) throws IOException {
        Map<String, String> map = new HashMap<>();
        String mail = user.getEmail();
        map.put("host", appUrl + "/validation?token=" + user.getToken() + "&&email=" + URLEncoder.encode(mail, "UTF-8"));
        map.put("fullName", user.getPrenom() + " " + user.getNom());
        map.put("email", user.getEmail());

        String original = "email-validation.html";
        String destination = "email-validation" + user.getId() + ".html";
        File fileOutput = getFileOutPut(destination, original, map);
        String object = "[Welcome to Chosa] Demande de validation de votre adresse mail";
        String body = htmltoString(destination);
        emailHandler.send(user.getEmail(), object, body);
        fileOutput.delete();
    }

    @Override
    public void sendForgetPasswordMail(User user) throws Exception {
        Map<String, String> map = new HashMap<>();
        String mail = user.getEmail();
        map.put("host", appUrl + "/reset-password?token=" + user.getToken() + "&&email=" + URLEncoder.encode(mail, "UTF-8"));
        map.put("fullName", user.getPrenom() + " " + user.getNom());
        map.put("email", user.getEmail());
        String original = "email-reset-password.html";
        String destination = "email-reset-password" + user.getId() + ".html";
        File fileOutput = getFileOutPut(destination, original, map);
        String body = htmltoString(destination);
        String object = "[Welcome to Chosa] Réinitialisation de votre mot de passe";
        emailHandler.send(user.getEmail(), object, body);
        fileOutput.delete();
    }


    @Override
    public void sendContactMail(User admin, String email, String name, String message) throws IOException {
        Map<String, String> map = new HashMap<>();
        String mailDestination = admin.getEmail();
        map.put("name", name);
        map.put("message", message);
        String original = "email-contact.html";
        String destination = "email-contact" + email + ".html";
        File fileOutput = getFileOutPut(destination, original, map);
        String object = "[Welcome to Chosa] Contact";
        String body = htmltoString(destination);
        emailHandler.send(mailDestination, email, null, object, body, null);
        fileOutput.delete();
    }

    @Override
    public void sendNotificationMail(User user) {
        String mail = user.getEmail();
        String body;
        if(user.getStatus().equals(User.STATUS.VALIDATE))
            body = "Compte validé";
        else    body = "Compte suspendus";
        String object = "[Welcome to Chosa] Réinitialisation de votre mot de passe";
        emailHandler.send(mail, object, body);
    }

    private File getFileOutPut(String destination, String original, Map<String, String> map) throws IOException {
        InputStream inputStream = createHtmlInputStream("html", original);
        File fileOutput = new File(destination);
        OutputStream outputStream = new FileOutputStream(fileOutput);
        HtmlManager.writeUsingOutputStream(inputStream, map, outputStream);
        return fileOutput;
    }

    private String htmltoString(String filePath) {
        StringBuilder contentBuilder = new StringBuilder();
        try (Stream<String> stream = Files.lines(Paths.get(filePath), StandardCharsets.UTF_8)) {
            stream.forEach(s -> contentBuilder.append(s).append("\n"));
        } catch (IOException e) {
            e.printStackTrace();
        }
        return contentBuilder.toString();
    }


    private InputStream createHtmlInputStream(String foldername, String fileName) throws IOException {
        int i = 0;
        Resource[] todoHtml = FileManager.getResourceFiles("/" + foldername, "html");
        while (!todoHtml[i].getFilename().contains(fileName)) {
            i++;
        }
        InputStream inputStream = todoHtml[i].getInputStream();
        return inputStream;
    }
}
