import styled from 'styled-components';

export const Container = styled.div`
  background: #fff;
  padding: 0 30px;
`;

export const Content = styled.div`
  height: 64px;
  max-width: 1308px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;

  nav {
    display: flex;
    align-items: center;
    margin-right: 20px;
    padding-right: 20px;
    border-right: 1px solid #eee;
  }

  aside {
    display: flex;
    align-items: center;
  }
`;

export const Profile = styled.div`
  display: flex;
  padding-left: 10px;

  div {
    text-align: right;
    margin-right: 10px;

    strong {
      font-size: 14px;
      color: #666;
    }

    button {
      margin-top: 5px;
      background: none;
      border: 0px;
      color: #ee4d64;
    }
  }
`;

export const Menu = styled.nav`
  display: flex;
  width: 100%;
  height: calc(100% - 20px);
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
    color: ${props => (props.selected ? '#444' : '#999')};
  }
`;
