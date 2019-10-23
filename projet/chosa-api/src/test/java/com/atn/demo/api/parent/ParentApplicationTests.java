package com.atn.demo.api.parent;


import com.atn.api.empty.module.user.entity.User;
import com.atn.api.empty.module.user.service.UserService;
import com.atn.api.empty.springbootdemo.Application;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

@RunWith(SpringRunner.class)
@SpringBootTest(classes = Application.class)
public class ParentApplicationTests {

	@Autowired
	private UserService userService;

	@Test
	public void contextLoads() {
		User user= userService.findById(1l);
	}

}
