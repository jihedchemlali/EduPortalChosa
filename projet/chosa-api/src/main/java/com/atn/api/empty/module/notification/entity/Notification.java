package com.atn.api.empty.module.notification.entity;

import com.atn.api.empty.module.child.entity.Child;
import com.atn.api.empty.module.user.entity.User;
import com.atn.commons.entities.ModelObject;
import lombok.Data;
import org.hibernate.annotations.Where;

import javax.persistence.*;
import java.util.Objects;

@Entity
@Data
@Table(name = "APP_NOTIFICATION", uniqueConstraints = @UniqueConstraint(columnNames = "NOTIFICATION_ID"))
@Where(clause = "DELETING_DATE is NULL")
public class Notification extends ModelObject<Long> {

    public enum STATUS {
        LUS("LUS"),
        NON_LUS("NON_LUS"),
        ARCHIVES("ARCHIVES");
        protected String value;

        STATUS(String value) {
            this.value = value;
        }

        @Override
        public String toString() {
            return value;
        }
    }

    public enum TYPE {
        CREATION("CREATION"), REFUSE("REFUSE"), ACCEPTATION("ACCEPTATION"), CONTACT("CONTACT");
        protected String value;

        TYPE(String value) {
            this.value = value;
        }

        @Override
        public String toString() {
            return value;
        }
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "NOTIFICATION_ID", unique = true, nullable = false)
    private Long id;

    @Enumerated(EnumType.STRING)
    @Column(name = "STATUS")
    private STATUS status;

    @Enumerated(EnumType.STRING)
    @Column(name = "TYPE")
    private TYPE type;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "DESTINATION_ID_FK")
    private User destination;

    @Column(name = "DESTINATION_URL")
    private String url;

    @Column(name = "TITLE")
    private String title;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "CHILD_ID_FK")
    private Child child;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        if (!super.equals(o)) return false;
        Notification that = (Notification) o;
        return id.equals(that.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(super.hashCode(), id);
    }

    @Override
    public String toString() {
        return "Notification{}";
    }
}