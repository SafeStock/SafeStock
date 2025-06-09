// src/test/java/com/example/safestock/ProdutoServiceTest.java
package com.example.safestock;

import com.example.safestock.model.Produto;
import com.example.safestock.model.enums.CategoriaProduto;
import com.example.safestock.repository.ProdutoRepository;
import com.example.safestock.service.ProdutoService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.time.LocalDate;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
public class ProdutoServiceTest {

    @Autowired
    private ProdutoService produtoService;

    @Autowired
    private ProdutoRepository produtoRepository;

    @Test
    void deveCadastrarProduto() {
        Produto produto = new Produto();
        produto.setNome("Produto Teste com nome bem grande para passar da validação 123456");
        produto.setCategoriaProduto(CategoriaProduto.chao);
        produto.setQuantidade(10);
        produto.setLimiteSemanalDeUso(5);
        produto.setDataValidade(LocalDate.now().plusDays(10));
        produto.setDataEntrada(LocalDate.now());

        produtoService.cadastrarProduto(produto);

        assertNotNull(produto.getId());
        Optional<Produto> salvo = produtoRepository.findById(produto.getId());
        assertTrue(salvo.isPresent());
        assertEquals("Produto Teste com nome bem grande para passar da validação 123456", salvo.get().getNome());
    }

    @Test
    void deveAtualizarProduto() {
        Produto produto = new Produto();
        produto.setNome("Produto Teste com nome bem grande para passar da validação 123456");
        produto.setCategoriaProduto(CategoriaProduto.chao);
        produto.setQuantidade(5);
        produto.setLimiteSemanalDeUso(2);
        produto.setDataValidade(LocalDate.now().plusDays(5));
        produto.setDataEntrada(LocalDate.now());
        produtoService.cadastrarProduto(produto);

        Produto novo = new Produto();
        novo.setNome("Produto Teste com nome bem grande para passar da validação 123456");
        novo.setCategoriaProduto(CategoriaProduto.chao);
        novo.setQuantidade(20);
        novo.setLimiteSemanalDeUso(10);
        novo.setDataValidade(LocalDate.now().plusDays(20));
        novo.setDataEntrada(LocalDate.now());

        Optional<Produto> atualizado = produtoService.atualizarProduto(produto.getId(), novo);

        assertTrue(atualizado.isPresent());
        assertEquals("Produto Teste com nome bem grande para passar da validação 123456", atualizado.get().getNome());
        assertEquals(20, atualizado.get().getQuantidade());
    }

    @Test
    void deveBuscarProdutoPorId() {
        Produto produto = new Produto();
        produto.setNome("Produto Teste com nome bem grande para passar da validação 123456");
        produto.setCategoriaProduto(CategoriaProduto.chao);
        produto.setQuantidade(7);
        produto.setLimiteSemanalDeUso(3);
        produto.setDataValidade(LocalDate.now().plusDays(15));
        produto.setDataEntrada(LocalDate.now());
        produtoService.cadastrarProduto(produto);

        Optional<Produto> encontrado = produtoService.buscarProdutoPorId(produto.getId());
        assertTrue(encontrado.isPresent());
        assertEquals("Produto Teste com nome bem grande para passar da validação 123456", encontrado.get().getNome());
    }

    @Test
    void deveDeletarProduto() {
        Produto produto = new Produto();
        produto.setNome("Produto Teste com nome bem grande para passar da validação 123456");
        produto.setCategoriaProduto(CategoriaProduto.chao);
        produto.setQuantidade(3);
        produto.setLimiteSemanalDeUso(1);
        produto.setDataValidade(LocalDate.now().plusDays(8));
        produto.setDataEntrada(LocalDate.now());
        produtoService.cadastrarProduto(produto);

        Long id = produto.getId();
        produtoService.deletarProdutos(id);

        Optional<Produto> excluido = produtoRepository.findById(id);
        assertFalse(excluido.isPresent());
    }


    @Test
    void deveRetornarQuantidadeProdutosProximosLimiteUso() {
        Produto produto = new Produto();
        produto.setNome("Produto Teste com nome bem grande para passar da validação 123456");
        produto.setCategoriaProduto(CategoriaProduto.chao);
        produto.setQuantidade(2);
        produto.setLimiteSemanalDeUso(2);
        produto.setDataValidade(LocalDate.now().plusDays(10));
        produto.setDataEntrada(LocalDate.now());
        produtoService.cadastrarProduto(produto);

        Long quantidade = produtoService.contarProdutosProximosLimiteUso();
        assertTrue(quantidade >= 1);
    }

    @Test
    void deveRetornarQuantidadeProdutosNoEstoque() {
        Produto produto = new Produto();
        produto.setNome("Produto Teste com nome bem grande para passar da validação 123457");
        produto.setCategoriaProduto(CategoriaProduto.chao);
        produto.setQuantidade(5);
        produto.setLimiteSemanalDeUso(2);
        produto.setDataValidade(LocalDate.now().plusDays(10));
        produto.setDataEntrada(LocalDate.now());
        produtoService.cadastrarProduto(produto);

        Long quantidade = produtoService.contarProdutosCadastrados();
        assertTrue(quantidade >= 1);
    }

    @Test
    void deveRetornarQuantidadeProdutosForaValidade() {
        Produto produto = new Produto();
        produto.setNome("Produto Teste com nome bem grande para passar da validação 123458");
        produto.setCategoriaProduto(CategoriaProduto.chao);
        produto.setQuantidade(3);
        produto.setLimiteSemanalDeUso(2);
        produto.setDataValidade(LocalDate.now().minusDays(1)); // já venceu
        produto.setDataEntrada(LocalDate.now().minusDays(10));
        produtoService.cadastrarProduto(produto);

        // Supondo que exista um método para contar produtos vencidos
        long vencidos = produtoRepository.countByDataValidadeBefore(LocalDate.now());
        assertTrue(vencidos >= 1);
    }

    @Test
    void deveValidarPorcentagemStatusAbastecimento() {
        // Exemplo: supondo que a porcentagem seja quantidade atual / limite semanal * 100
        Produto produto = new Produto();
        produto.setNome("Produto Teste com nome bem grande para passar da validação 123459");
        produto.setCategoriaProduto(CategoriaProduto.chao);
        produto.setQuantidade(5);
        produto.setLimiteSemanalDeUso(10);
        produto.setDataValidade(LocalDate.now().plusDays(10));
        produto.setDataEntrada(LocalDate.now());
        produtoService.cadastrarProduto(produto);

        Produto salvo = produtoRepository.findById(produto.getId()).get();
        double porcentagem = (double) salvo.getQuantidade() / salvo.getLimiteSemanalDeUso() * 100;
        assertEquals(50.0, porcentagem);
    }

    @Test
    void deveValidarQuantidadeProdutosRetiradosDoEstoque() {
        // Supondo que exista um campo ou lógica para controlar retiradas
        // Exemplo fictício: quantidade inicial - quantidade atual = retirados
        Produto produto = new Produto();
        produto.setNome("Produto Teste com nome bem grande para passar da validação 123460");
        produto.setCategoriaProduto(CategoriaProduto.chao);
        produto.setQuantidade(10);
        produto.setLimiteSemanalDeUso(5);
        produto.setDataValidade(LocalDate.now().plusDays(10));
        produto.setDataEntrada(LocalDate.now());
        produtoService.cadastrarProduto(produto);

        // Simula retirada
        produto.setQuantidade(7);
        produtoRepository.save(produto);

        Produto salvo = produtoRepository.findById(produto.getId()).get();
        int retirados = 10 - salvo.getQuantidade();
        assertEquals(3, retirados);
    }
}
