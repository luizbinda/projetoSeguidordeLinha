import styled from 'styled-components';

export const ContainerBootstrap = styled.div.attrs(props => ({
  className: 'container',
  style: {
    backgroundColor: 'white',
    marginTop: 80,
    borderRadius: 18,
    padding: 30,
  },
}))``;

export const Container = styled.div`
  background-color: white;
  margin-top: 20;
  padding: 5;
  display: flex;
  flex-direction: row;
`;

export const Container2 = styled.div.attrs(props => ({
  className: 'container',
  style: {
    backgroundColor: 'white',
    marginTop: 5,
    marginBottom: 30,
    borderRadius: 18,
    padding: 30,
  },
}))``;

export const P = styled.p`
  font-size: 18px;
  font-weight: bold;
`;

export const P2 = styled.p`
  font-size: 14px;
  border: 2px solid #dcdcdc;
  border-radius: 5px;
  padding: 5px;
`;
