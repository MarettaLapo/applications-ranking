package ru.isu.restfirst.model;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import lombok.ToString;

import javax.persistence.*;
import java.time.LocalDate;

@Entity
@Setter
@Getter
@RequiredArgsConstructor
@ToString
@Table(name = "admin_panel")
public class AdminPanel {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name="end_date")
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
    private LocalDate endDate;

    @Column(name = "approve_count")
    private Integer approveCount;

    @Column(name = "now")
    private Boolean now;

    public AdminPanel(LocalDate endDate, Integer approveCount, Boolean now) {
        this.endDate = endDate;
        this.approveCount = approveCount;
        this.now = now;
    }
}
