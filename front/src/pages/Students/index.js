import React from 'react';
import { MdAdd, MdSearch } from 'react-icons/md';

import { StudentList, Header, ButtonCadastrar, Search } from './styles';

export default function Students() {
  return (
    <>
      <StudentList>
        <Header>
          <strong>Gerenciando alunos</strong>
          <div>
            <ButtonCadastrar type="button">
              <MdAdd color="#fff" size={20} />
              <div>CADASTRAR</div>
            </ButtonCadastrar>

            <Search>
              <MdSearch size={16} color="#999" />
              <input type="text" placeholder="Buscar aluno" />
            </Search>
          </div>
        </Header>
      </StudentList>
    </>
  );
}
