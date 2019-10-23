package com.atn.api.empty.module.user.service;


import com.atn.api.empty.module.role.entity.Role.ROLE;
import com.atn.api.empty.module.user.entity.User;
import com.atn.commons.service.MyService;

import java.util.List;

public interface UserService extends MyService<User, Long> {

    User findByEmail(String email);

    User addUser(User user);

    User getConnectedUser();

    List<User> getUsers(ROLE role, User.STATUS status, Integer size, int offset);

    User getUserByFaceBookId(String faceBookId);

}
