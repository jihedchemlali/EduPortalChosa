package com.atn.api.empty.module.role.controller.rest;


import com.atn.api.empty.module.role.controller.dto.UserRoleDto;
import com.atn.api.empty.module.role.entity.Role;
import com.atn.api.empty.module.role.service.UserRoleService;
import com.atn.commons.controller.rest.MyRestController;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/roles/")

public class UserRoleController extends MyRestController<UserRoleService ,UserRoleDto,Role ,Long> {


    public UserRoleController(@Autowired UserRoleService userRoleService) {
        super(userRoleService);
    }

    @Override
    protected Role mapperFromDto(UserRoleDto userRoleDto) {
        return null;
    }

    @Override
    protected UserRoleDto mapperToDto(Role role) {
        return null;
    }


}
