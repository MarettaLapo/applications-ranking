package ru.isu.restfirst.model;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.time.LocalDate;

@Setter
@Getter
@ToString
public class NewAdminResponse {
    LocalDate endDate;
    Integer count;
}
