import styled from 'styled-components';

import palette from '~/styles/palette';

import GymLogo from '~/components/Logo';

export const Container = styled.div`
  background: ${palette.white};
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
  border: 1px solid ${palette.lightGrey};
`;

export const Content = styled.div`
  height: 64px;
  max-width: 1308px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  padding: 10px 0px;

  nav {
    display: flex;
    align-items: center;
    border-left: 1px solid ${palette.lightGrey};
  }
`;

export const Logo = styled(GymLogo).attrs(() => ({
  size: 24,
}))`
  flex-direction: row;
  margin: 20px;
  font-size: 18px;
`;

export const Menu = styled.nav`
  display: flex;
  height: 100%;
  flex: 1;
  ul {
    list-style: none;
    display: flex;
    flex-direction: row;

    li {
      margin: 0 20px;
    }
  }
`;

export const MenuButton = styled.button`
  background: none;
  border: 0px;

  strong {
    font-size: 15px;
    color: ${props => (props.selected ? palette.dark : palette.darkGrey)};
  }
`;

export const Profile = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding-left: 10px;
  width: 150px;

  text-align: right;
  margin-right: 10px;

  strong {
    font-size: 14px;
    color: ${palette.dark};
  }

  button {
    margin-top: 5px;
    background: none;
    border: 0px;
    color: ${palette.primary};
  }
`;
