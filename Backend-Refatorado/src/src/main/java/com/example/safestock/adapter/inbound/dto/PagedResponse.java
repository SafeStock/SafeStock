package com.example.safestock.adapter.inbound.dto;

import java.util.List;

/**
 * DTO para resposta paginada HTTP.
 * Camada de adaptador - converte PagedResult (domínio) para JSON.
 */
public class PagedResponse<T> {
    private List<T> content;
    private int page;
    private int size;
    private int totalPages;
    private long totalElements;

    public PagedResponse(List<T> content, int page, int size, int totalPages, long totalElements) {
        this.content = content;
        this.page = page;
        this.size = size;
        this.totalPages = totalPages;
        this.totalElements = totalElements;
    }

    /**
     * Converte PagedResult (domínio) para PagedResponse (DTO)
     */
    public static <T> PagedResponse<T> from(com.example.safestock.domain.model.PagedResult<T> pagedResult) {
        return new PagedResponse<>(
                pagedResult.getContent(),
                pagedResult.getPage(),
                pagedResult.getSize(),
                pagedResult.getTotalPages(),
                pagedResult.getTotalElements()
        );
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
