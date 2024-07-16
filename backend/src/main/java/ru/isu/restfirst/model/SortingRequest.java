package ru.isu.restfirst.model;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Setter
@Getter
@ToString
public class SortingRequest {
    Boolean another;
    String disability;
    String family;
}
