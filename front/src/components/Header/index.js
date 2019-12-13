import React, { useState, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import { Container, Content, Logo, Profile, Menu, MenuButton } from './styles';

import { signOut } from '~/store/modules/auth/actions';

export default function Header() {
  const [selected, setSelected] = useState('students');
  const profile = useSelector(state => state.user.profile);
  const dispatch = useDispatch();

  const handleSignOut = useCallback(() => {
    dispatch(signOut());
  }, [dispatch]);

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
        <Logo />
        <Menu>
          <ul>
            <li>
              <Link to="/students">
                <MenuButton
                  type="button"
                  onClick={() => handleClickMenu({ menu: 'students' })}
                  selected={selected === 'students'}
                >
                  <strong>ALUNOS</strong>{' '}
                </MenuButton>
              </Link>
            </li>
            <li>
              <Link to="/plans">
                <MenuButton
                  type="button"
                  onClick={() => handleClickMenu({ menu: 'plans' })}
                  selected={selected === 'plans'}
                >
                  <strong>PLANOS</strong>
                </MenuButton>
              </Link>
            </li>
            <li>
              <Link to="/registrations">
                <MenuButton
                  type="button"
                  onClick={() => handleClickMenu({ menu: 'registrations' })}
                  selected={selected === 'registrations'}
                >
                  <strong>MATRÍCULAS</strong>
                </MenuButton>
              </Link>
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
        <Profile>
          <strong>{profile.name}</strong>
          <button type="button" onClick={handleSignOut}>
            sair do sistema
          </button>
        </Profile>
      </Content>
    </Container>
  );
}
