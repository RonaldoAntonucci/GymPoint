import React, { useState, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Logo from '~/components/Logo';
import { Container, Content, Profile, Menu, MenuButton } from './styles';

import { signOut } from '~/store/modules/auth/actions';

export default function Header() {
  const [selected, setSelected] = useState('ALUNOS');
  const profile = useSelector(state => state.user.profile);
  const dispatch = useDispatch();

  function handleSignOut() {
    dispatch(signOut());
  }

  const handleClickMenu = useCallback(
    ({ menu }) => {
      if (menu !== selected) {
        setSelected(menu);
      }
    },
    [selected]
  );

  return (
    <Container>
      <Content>
        <Logo size={18} />
        <Menu>
          <ul>
            <li>
              <MenuButton
                type="button"
                onClick={() => handleClickMenu({ menu: 'students' })}
                selected={selected === 'students'}
              >
                <strong>ALUNOS</strong>{' '}
              </MenuButton>
            </li>
            <li>
              <MenuButton
                type="button"
                onClick={() => handleClickMenu({ menu: 'plans' })}
                selected={selected === 'plans'}
              >
                <strong>PLANOS</strong>
              </MenuButton>
            </li>
            <li>
              <MenuButton
                type="button"
                onClick={() => handleClickMenu({ menu: 'registrations' })}
                selected={selected === 'registrations'}
              >
                <strong>MATRÍCULAS</strong>
              </MenuButton>
            </li>
            <li>
              <MenuButton
                type="button"
                onClick={() => handleClickMenu({ menu: 'help-orders' })}
                selected={selected === 'help-orders'}
              >
                <strong>PEDIDOS DE AUXÍLIO</strong>
              </MenuButton>
            </li>
          </ul>
        </Menu>
        <aside>
          <Profile>
            <div>
              <strong>{profile.name}</strong>
              <button type="button" onClick={handleSignOut}>
                sair do sistema
              </button>
            </div>
          </Profile>
        </aside>
      </Content>
    </Container>
  );
}
