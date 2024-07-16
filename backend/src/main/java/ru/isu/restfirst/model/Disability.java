package ru.isu.restfirst.model;

public enum Disability {
    NONE("Нет", 0L),
    FIRST("1 группа", 10000L),
    SECOND("2 группа", 100000L),
    THIRD("3 группа", 200000L);
    String name;
    Long value;

    Disability(String name, Long value) {
        this.name = name;
        this.value = value;
    }

    public String getName() {
        return name;
    }

    public Long getValue(){
        return this.value;
    }
}
