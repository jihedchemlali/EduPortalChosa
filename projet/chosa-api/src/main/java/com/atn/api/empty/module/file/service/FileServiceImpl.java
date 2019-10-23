package com.atn.api.empty.module.file.service;

import com.atn.api.empty.module.file.entity.File;
import com.atn.api.empty.module.file.persistence.FileDao;
import com.atn.api.empty.module.role.entity.Role;
import com.atn.api.empty.module.user.entity.User;
import com.atn.api.empty.module.user.service.UserService;
import com.atn.commons.persistence.BaseDao;
import com.atn.commons.service.MyAbstractService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Calendar;
import java.util.HashMap;
import java.util.List;
import java.util.Map;


@Component
public class FileServiceImpl extends MyAbstractService<File, Long> implements FileService {

    @Value("${user.file.folder}")
    private String uploadPath;

    @Autowired
    private UserService userService;

    public FileServiceImpl(FileDao fileDao) {
        super(fileDao);
    }

    @Override
    protected FileDao getDataAccessObject() {
        return (FileDao) dataAccessObject;
    }

    @Override
    @Transactional
    public File uploadMultipartFile(MultipartFile file) {
        if (file==null || file.isEmpty()) {
            return null;
        }
        try {
            Calendar now = Calendar.getInstance();
            int year = now.get(Calendar.YEAR);
            int month = now.get(Calendar.MONTH) + 1;
            int day = now.get(Calendar.DAY_OF_MONTH);
            String url = year + java.io.File.separator + month + java.io.File.separator + day + java.io.File.separator;
            File fileToAdd = new File();
            fileToAdd.setFileName(file.getOriginalFilename());
            fileToAdd.setFilePath(uploadPath +url);
            fileToAdd.setUser(userService.getConnectedUser());
            fileToAdd = save(fileToAdd);
            byte[] bytes = file.getBytes();
            Path path = Paths.get(uploadPath + url + fileToAdd.getId());
            java.io.File dir = new java.io.File(uploadPath + url);
            if (!dir.exists()) {
                dir.mkdirs();
            }
            Files.write(path, bytes);
            return fileToAdd;
        } catch (IOException e) {
            e.printStackTrace();
        }
        return null;
    }

    @Override
    public void downloadDocument(OutputStream os, File file) throws IOException {
        InputStream is = new FileInputStream(file.getFilePath()+file.getId());
        byte[] buffer = new byte[1024];
        int len;
        while ((len = is.read(buffer)) != -1) {
            os.write(buffer, 0, len);
        }
        os.flush();
        os.close();
        is.close();
    }

}
