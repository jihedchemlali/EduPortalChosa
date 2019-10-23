package com.atn.generator.dto;

import javax.xml.bind.annotation.XmlRootElement;
import javax.xml.bind.annotation.XmlElement;

import lombok.Data;
import java.util.Date;
import com.atn.commons.controller.dto.ModelDto;
import java.io.Serializable;
@Data
@XmlRootElement
public class FileDto extends ModelDto < Long > implements Serializable {

	@XmlElement
	private Long id;
	@XmlElement
	private String fileName;
	@XmlElement
	private String path;
	@XmlElement
	private String type;
	@XmlElement
	private Long user;
	@Override
	public Long getId() {
		return this.id;
	}
}