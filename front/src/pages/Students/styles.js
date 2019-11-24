import styled from 'styled-components';

export const Header = styled.div`
  margin-top: 34px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  strong {
    font-size: 24px;
  }

  > div {
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

export const ButtonCadastrar = styled.button`
  background: #ee4d64;
  border: 0px;
  border-radius: 4px;
  font-weight: bold;
  color: #fff;
  height: 100%;
  padding: 8px;

  display: flex;
  align-items: center;
  justify-content: center;

  div {
    margin-left: 8px;
  }
`;

export const Search = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 8px;
  margin-left: 20px;
  background: #fff;
  border-radius: 4px;

  input {
    border: 0px;
    margin-left: 8px;
  }
`;

export const Actions = styled.div`
  display: flex;
  justify-content: flex-end;
  &[edit] {
    color: #4d85ee;
  }

  button {
    background: none;
    border: 0;
    margin: 0 18px;
  }
`;

export const EditButton = styled.button`
  color: #4d85ee;
`;

export const DeleteButton = styled.button`
  color: #de3b3b;
`;
