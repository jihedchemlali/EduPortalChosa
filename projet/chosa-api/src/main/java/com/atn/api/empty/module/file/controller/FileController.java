package com.atn.api.empty.module.file.controller;

import com.atn.api.empty.module.file.entity.File;
import com.atn.api.empty.module.file.service.FileService;
import com.atn.api.empty.module.role.entity.Role;
import com.atn.api.empty.module.user.entity.User;
import com.atn.api.empty.module.user.service.UserService;
import com.atn.commons.controller.rest.MyRestController;
import com.atn.commons.persistence.BaseDao;
import com.atn.generator.dto.FileDto;
import com.atn.generator.dto.UserDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.OutputStream;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;


@RestController
@CrossOrigin("*")
@RequestMapping("/api/files")
public class FileController extends MyRestController<FileService, FileDto, File, Long> {

    @Autowired
    UserService userService;

    public FileController(@Autowired FileService service) {
        super(service);
    }
    public FileService getService(){return service;}

    @Override
    protected File mapperFromDto(FileDto fileDto) {
        File file = new File();
        file.setId(fileDto.getId());
        file.setFileName(fileDto.getFileName());
        file.setFilePath(fileDto.getPath());
        file.setUser(fileDto.getUser() != null ? userService.findById(fileDto.getUser()) : null);
        return file;
    }

    @Override
    protected FileDto mapperToDto(File file) {
        FileDto fileDto = new FileDto();
        fileDto.setId(file.getId());
        fileDto.setFileName(file.getFileName());
        fileDto.setPath(file.getFilePath());
        fileDto.setUser(file.getUser().getId());
        return fileDto;
    }

    @RequestMapping(value = {"/{id}"}, method = RequestMethod.GET)
    public void downloadDocument(HttpServletResponse response, @PathVariable Long id) throws IOException {
        File file = service.findById(id);
        response.setContentType("application/octet-stream");
        response.setHeader("Content-Disposition", "attachment; filename=\"" + file.getFileName());
        OutputStream os = response.getOutputStream();
        service.downloadDocument(os, file);
    }

}
