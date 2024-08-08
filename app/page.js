import {contactList} from '@/actions/actions';
import Add from '@/components/add';
import Pagination from '@/components/pagination';
import Table from '@/components/table';

export default async function Home({params, searchParams}) {
    const {contacts, pages} = await contactList(searchParams);

  return (
      <div className="container mx-auto mb-16">
          <h3 className="text-3xl mb-4">MY AMAZING CONTACTS</h3>
          <div className="mb-4">
              {contacts ? <Table contacts={contacts}/> : 'null'}
        </div>
          <Pagination pages={pages}/>
          <div>
              <Add/>
          </div>
      </div>
  );
}
