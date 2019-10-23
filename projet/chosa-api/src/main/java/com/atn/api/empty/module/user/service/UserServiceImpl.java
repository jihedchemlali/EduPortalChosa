package com.atn.api.empty.module.user.service;

import com.atn.api.empty.module.mail.Service.EmailService;
import com.atn.api.empty.module.role.entity.Role;
import com.atn.api.empty.module.role.entity.Role.ROLE;
import com.atn.api.empty.module.role.service.UserRoleService;
import com.atn.api.empty.module.user.entity.User;
import com.atn.api.empty.module.user.persistence.UserDao;
import com.atn.commons.persistence.BaseDao;
import com.atn.commons.service.MyAbstractService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.authentication.AnonymousAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;


@Component
public class UserServiceImpl extends MyAbstractService<User, Long> implements UserService, UserDetailsService {

    @Autowired
    private EmailService emailService;

    @Autowired
    private UserRoleService userRoleService;

    public UserServiceImpl(UserDao userDao) {
        super(userDao);
    }

    @Override
    public UserDao getDataAccessObject() {
        return (UserDao) dataAccessObject;
    }

    @Override
    @Transactional
    public User addUser(User user) {

        user.setStatus(User.STATUS.SIGNUP);
        user = save(user);

        if (user.getUserPassword() != null) {
            BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
            user.setUserPassword(passwordEncoder.encode(user.getUserPassword()));
        }
        try {
            emailService.sendValidationMail(user);
        } catch (Exception e) {
            e.printStackTrace();
        }
        Set<Role> roles = new HashSet<>();
        Role role = new Role();
        role.setCreationDate(new Date());
        role.setRole(ROLE.PARENT);
        role.setUser(user);
        roles.add(role);

        user.setRoles(roles);
        return save(user);
    }

    @Override
    public User findByEmail(String email) {
        Map<String, Object> map = new HashMap<>();
        map.put("=email", email);
        List<User> result = findListByCriteria(map, 1, 0, BaseDao.DELETION_STATUS.ACTIVE);
        if (result.size() > 0) {
            return result.get(0);
        } else {
            return null;
        }

    }

    @Transactional
    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = findByEmail(username);
        if (user == null) {
            throw new UsernameNotFoundException("L'adresse email '" + username + "' est introuvale ou désactivé !!!");
        }
        String password = user.getUserPassword();
        boolean enabled = user.getDeletingDate() == null;
        boolean accountNonExpired = true;
        boolean credentialsNonExpired = true;
        boolean accountNonLocked = true;
        Collection<? extends GrantedAuthority> authorities = user.getRoles();
        org.springframework.security.core.userdetails.User connectedUser = new org.springframework.security.core.userdetails.User(
                username, password, enabled, accountNonExpired, credentialsNonExpired, accountNonLocked, authorities);
        return connectedUser;
    }

    @PreAuthorize("authenticated")
    public User getConnectedUser() {

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (!(authentication instanceof AnonymousAuthenticationToken)) {
            UserDetails userDetails = ((UserDetails) authentication.getPrincipal());
            User user = findByEmail(userDetails.getUsername());
            return user;
        }
        return null;
    }

    @Override
    public List<User> getUsers(ROLE role, User.STATUS status, Integer size, int start) {
        Map<String, Object> map = new HashMap<>();
        map.put("=roles.role", role);
        if (status != null)
            map.put("=status", status);
        List<User> users = findListByCriteria(map, size, start, BaseDao.DELETION_STATUS.ACTIVE);
        return users;
    }

    @Override
    public User getUserByFaceBookId(String facebook_Id) {
        Map<String, Object> map = new HashMap<>();
        User user;
        map.put("=facebook_Id", facebook_Id);
        try {
            user = findListByCriteria(map, 1, 0, BaseDao.DELETION_STATUS.ACTIVE).get(0);
            return user;
        } catch (IndexOutOfBoundsException e) {
            return null;
        }
    }

}
