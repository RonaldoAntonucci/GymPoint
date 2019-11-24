import React from 'react';
import { useSelector } from 'react-redux';

import Logo from '~/components/Logo';
import { Container, Content, Profile, Menu, MenuButton } from './styles';

export default function Header() {
  const profile = useSelector(state => state.user.profile);
  return (
    <Container>
      <Content>
        <Logo size={18} />
        <Menu>
          <ul>
            <li>
              <MenuButton type="button">
                <strong>ALUNOS</strong>{' '}
              </MenuButton>
            </li>
            <li>
              <MenuButton type="button">
                <strong>PLANOS</strong>
              </MenuButton>
            </li>
            <li>
              <MenuButton type="button">
                <strong>MATRÍCULAS</strong>
              </MenuButton>
            </li>
            <li>
              <MenuButton type="button">
                <strong>PEDIDOS DE AUXÍLIO</strong>
              </MenuButton>
            </li>
          </ul>
        </Menu>
        <aside>
          <Profile>
            <div>
              <strong>{profile.name}</strong>
              <button type="button">sair do sistema</button>
            </div>
          </Profile>
        </aside>
      </Content>
    </Container>
  );
}
