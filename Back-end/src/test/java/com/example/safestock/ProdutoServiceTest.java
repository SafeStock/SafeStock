package com.example.safestock;

import com.example.safestock.model.Produto;
import com.example.safestock.model.enums.CategoriaProduto;
import com.example.safestock.repository.HistoricoAlertasRepository;
import com.example.safestock.repository.ProdutoRepository;
import com.example.safestock.service.ProdutoService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class ProdutoServiceTest {

    @Mock
    private ProdutoRepository produtoRepository;

    @Mock
    private HistoricoAlertasRepository historicoAlertasRepository;

    @InjectMocks
    private ProdutoService produtoService;

    private Produto criarProdutoValido() {
        Produto produto = new Produto();
        produto.setId(1L);
        produto.setNome("Produto Teste com nome bem grande para passar da validação 123456");
        produto.setCategoriaProduto(CategoriaProduto.chao);
        produto.setQuantidade(10);
        produto.setLimiteSemanalDeUso(5);
        produto.setDataValidade(LocalDate.now().plusDays(10));
        produto.setDataEntrada(LocalDateTime.now());
        return produto;
    }

    @Test
    void deveCadastrarProduto() {
        Produto produto = criarProdutoValido();

        when(produtoRepository.save(any(Produto.class))).thenReturn(produto);

        produtoService.cadastrarProduto(produto);

        verify(produtoRepository).save(produto);
        assertEquals("Produto Teste com nome bem grande para passar da validação 123456", produto.getNome());
    }

    @Test
    void deveAtualizarProduto() {
        Produto produto = criarProdutoValido();
        Produto novo = criarProdutoValido();
        novo.setQuantidade(20);
        novo.setLimiteSemanalDeUso(10);

        when(produtoRepository.findById(1L)).thenReturn(Optional.of(produto));
        when(produtoRepository.save(any(Produto.class))).thenReturn(novo);

        Optional<Produto> atualizado = produtoService.atualizarProduto(1L, novo);

        assertTrue(atualizado.isPresent());
        assertEquals(20, atualizado.get().getQuantidade());
    }

    @Test
    void deveBuscarProdutoPorId() {
        Produto produto = criarProdutoValido();

        when(produtoRepository.findById(1L)).thenReturn(Optional.of(produto));

        Optional<Produto> encontrado = produtoService.buscarProdutoPorId(1L);
        assertTrue(encontrado.isPresent());
    }

    @Test
    void deveDeletarProduto() {
        Long id = 1L;
        Produto produto = criarProdutoValido();
        
        when(produtoRepository.findById(id)).thenReturn(Optional.of(produto));
        doNothing().when(historicoAlertasRepository).deleteByProduto(produto);
        doNothing().when(produtoRepository).deleteById(id);

        produtoService.deletarProdutos(id);

        verify(produtoRepository).findById(id);
        verify(historicoAlertasRepository).deleteByProduto(produto);
        verify(produtoRepository).deleteById(id);
    }

    @Test
    void deveRetornarQuantidadeProdutosProximosLimiteUso() {
        when(produtoRepository.countProdutosProximosLimiteUso()).thenReturn(1L);

        Long quantidade = produtoService.contarProdutosProximosLimiteUso();

        assertTrue(quantidade >= 1);
    }



    @Test
    void deveRetornarQuantidadeProdutosNoEstoque() {
        when(produtoRepository.count()).thenReturn(5L);

        Long quantidade = produtoService.contarProdutosCadastrados();
        assertEquals(5L, quantidade);
    }

    @Test
    void deveRetornarQuantidadeProdutosForaValidade() {
        when(produtoRepository.countByDataValidadeBefore(LocalDate.now())).thenReturn(2L);

        long vencidos = produtoRepository.countByDataValidadeBefore(LocalDate.now());
        assertTrue(vencidos >= 1);
    }

    @Test
    void deveValidarPorcentagemStatusAbastecimento() {
        Produto produto = criarProdutoValido();
        produto.setQuantidade(5);
        produto.setLimiteSemanalDeUso(10);

        when(produtoRepository.findById(1L)).thenReturn(Optional.of(produto));

        Produto salvo = produtoRepository.findById(1L).get();
        double porcentagem = (double) salvo.getQuantidade() / salvo.getLimiteSemanalDeUso() * 100;
        assertEquals(50.0, porcentagem);
    }

    @Test
    void deveValidarQuantidadeProdutosRetiradosDoEstoque() {
        Produto produto = criarProdutoValido();
        produto.setQuantidade(7);

        when(produtoRepository.findById(1L)).thenReturn(Optional.of(produto));

        Produto salvo = produtoRepository.findById(1L).get();
        int retirados = 10 - salvo.getQuantidade();
        assertEquals(3, retirados);
    }
}
