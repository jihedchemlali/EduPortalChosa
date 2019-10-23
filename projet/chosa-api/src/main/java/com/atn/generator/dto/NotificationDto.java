package com.atn.generator.dto;

import javax.xml.bind.annotation.XmlRootElement;
import javax.xml.bind.annotation.XmlElement;

import lombok.Data;
import java.util.Date;
import com.atn.commons.controller.dto.ModelDto;
import java.io.Serializable;
@Data
@XmlRootElement
public class NotificationDto extends ModelDto < Long > implements Serializable {

	@XmlElement
	private Long id;
	@XmlElement
	private String status;
	@XmlElement
	private String type;
	@XmlElement
	private Long destination;
	@XmlElement
	private String url;
	@XmlElement
	private String title;
	@XmlElement
	private Long child;
	@XmlElement
	private Date creationDate;
	@Override
	public Long getId() {
		return this.id;
	}
}