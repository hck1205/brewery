import React from 'react';
import BeerList from '../component/BeerList';
import Layout from '../layout/Layout';

class Index extends React.Component {
    render() {
        return (
          <Layout>
            <BeerList />
          </Layout>
        )
    }
}

export default Index