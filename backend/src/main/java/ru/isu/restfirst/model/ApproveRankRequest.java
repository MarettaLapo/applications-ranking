package ru.isu.restfirst.model;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.util.List;
import java.util.Map;
import java.util.Objects;

@Setter
@Getter
@ToString
public class ApproveRankRequest {
    List<Long> checking;
    List<Long> rankingId;
    List<Long> rankingRank;
}
