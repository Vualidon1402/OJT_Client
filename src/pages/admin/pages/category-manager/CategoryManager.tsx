import { useSelector } from 'react-redux';
import { StoreType } from '@/store';
import './CategoryManager.scss';

function CategoryManager() {
  const categoryStore = useSelector((store: StoreType) => store.categoryStore);

  console.log(categoryStore.data);

  return (
    <div className="table-container">
      <h1>Category Manager</h1>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Created At</th>
            <th>Image</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {categoryStore.data?.map((category, index) => (
            <tr key={category.id}>
              <td>{index + 1}</td>
              <td>{category.categoryName}</td>
              <td>{category.createdAt}</td>
              <td><img src={category.image} alt={category.categoryName} width="50" /></td>
              <td>{category.status ? 'Active' : 'Inactive'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default CategoryManager;