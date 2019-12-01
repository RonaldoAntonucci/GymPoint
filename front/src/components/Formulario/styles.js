import styled from 'styled-components';

export const Container = styled.div`
  background-color: #fff;
  width: 100%;
  padding: 20px;
  border-radius: 4px;
`;

export const InputRow = styled.ul`
  display: grid;
  grid-template-columns: ${props => {
    let area = ' ';
    for (let i = 0; i < props.area; i += 1) {
      area += '1fr ';
    }
    return area;
  }};

  & + ul {
    margin-top: 20px;
  }

  > li {
    display: flex;
    flex-direction: column;
    justify-content: center;
    & + li {
      margin-left: 20px;
    }

    strong {
      margin-bottom: 5px;
      font-size: 14px;
    }

    input {
      border: 1px solid;
      border-color: #999;
      border-radius: 4px;
      height: 44px;
      padding: 0 15px;
      margin: 0 0 10px;
    }
  }
`;

export const HButton = styled.button`
  background: ${props => props.color || '#fff'};
  border: 0px;
  border-radius: 4px;
  font-weight: bold;
  color: #fff;
  height: 100%;
  padding: 8px;
  margin-left: 20px;

  display: flex;
  align-items: center;
  justify-content: center;

  div {
    margin-left: 8px;
  }
`;
