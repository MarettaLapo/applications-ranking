package ru.isu.restfirst.model;

public enum FamilyCircumstances {
    NONE("Нет", 0L),
    LOSS("Потеря кормильца", 100000L),
    ORPHAN("Сирота", 1000000L);

    String name;
    Long value;

    FamilyCircumstances(String name, Long value) {
        this.name = name;
        this.value = value;
    }
    public String getName(){
        return this.name;
    }

    public Long getValue() {
        return value;
    }
}
