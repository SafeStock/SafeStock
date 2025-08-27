package com.example.safestock.core.application.usecase;
import com.example.safestock.core.dto.funcionario.FuncionarioDetalhesDTO;
import com.example.safestock.core.domain.Funcionario;
import com.example.safestock.infrastructure.repository.FuncionarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import java.util.Optional;
import org.springframework.stereotype.Service;

@Service
public class AutenticacaoService implements UserDetailsService {

    @Autowired
    private FuncionarioRepository funcionarioRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException{
        Optional<Funcionario> funcionarioOpt = funcionarioRepository.findByEmail(username);

        if (funcionarioOpt.isEmpty()){
            throw new UsernameNotFoundException(String.format("funcionario: %s nao encontrado", username));

        }

        return new FuncionarioDetalhesDTO(funcionarioOpt.get());
    }

}