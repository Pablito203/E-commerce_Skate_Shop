using Microsoft.EntityFrameworkCore;
using System.Linq.Expressions;

namespace SkateShopAPI.EntityModels {
    public class Repository: IDisposable {
        public SkateShopContext? Context = null;

        public void GenerateContext() {
            this.Context = new SkateShopContext();
        }

        public void Insert<T>(T Entity) where T: class 
        {
            if (this.Context is null){
                this.GenerateContext();
            }
            Context.Set<T>().Add(Entity);
            Context.SaveChanges();
        }

        public void Insert<T>(List<T> Entities) where T: class 
        {
            if (Context is null) {
                this.GenerateContext();
            }

            Context.Set<T>().AddRange(Entities);

            Context.SaveChanges();
        }

        public void Update<T>(T Entity) where T: class 
        {
            if (this.Context is null) {
                this.GenerateContext();
            }
            Context.Entry(Entity).State = EntityState.Modified;
            Context.SaveChanges();
        }

        public void Update<T>(List<T> Entities) where T: class 
        {
            if (Context is null) {
                this.GenerateContext();
            }

            foreach (T Entity in Entities) {
                Context.Entry(Entity).State = EntityState.Modified;
            }

            Context.SaveChanges();
        }

        public void Delete<T>(T Entity) where T: class
        {
            if (this.Context is null) {
                this.GenerateContext();
            }
            Context.Set<T>().Remove(Entity);
            Context.SaveChanges();
        }

        public void Delete<T>(List<T> Entities) where T: class
        {
            if (Context is null) {
                this.GenerateContext();
            }
            Context.Set<T>().RemoveRange(Entities);
            Context.SaveChanges();
        }

        public IQueryable<T> FilterQuery<T>(Expression<System.Func<T, bool>> filter) where T : class
        {
            if (Context is null) {
                this.GenerateContext();
            }

            return Context.Set<T>().AsNoTracking().Where(filter);
        }

        public void Dispose()
        {
            if (this.Context != null) {
                this.Context.Dispose();
                this.Context = null;
            }
        }
    }
}
