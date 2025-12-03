package com.example.safestock.domain.model;

import java.util.List;

/**
 * Modelo de domínio para resultados paginados.
 * Não depende de frameworks externos (Spring, etc).
 */
public class PagedResult<T> {
    private List<T> content;
    private int page;
    private int size;
    private int totalPages;
    private long totalElements;

    public PagedResult(List<T> content, int page, int size, long totalElements) {
        this.content = content;
        this.page = page;
        this.size = size;
        this.totalElements = totalElements;
        this.totalPages = (int) Math.ceil((double) totalElements / size);
    }

    // Getters
    public List<T> getContent() {
        return content;
    }

    public int getPage() {
        return page;
    }

    public int getSize() {
        return size;
    }

    public int getTotalPages() {
        return totalPages;
    }

    public long getTotalElements() {
        return totalElements;
    }
}
