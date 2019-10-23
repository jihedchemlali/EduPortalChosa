package com.atn.generator.dto;

import javax.xml.bind.annotation.XmlRootElement;
import javax.xml.bind.annotation.XmlElement;

import lombok.Data;
import java.util.Date;
import com.atn.commons.controller.dto.ModelDto;
import java.io.Serializable;
@Data
@XmlRootElement
public class ActivityDto extends ModelDto < Long > implements Serializable {

	@XmlElement
	private Long id;
	@XmlElement
	private Integer age;
	@XmlElement
	private String status;
	@XmlElement
	private Date date_publication;
	@XmlElement
	private Long file;
	@Override
	public Long getId() {
		return this.id;
	}
}