using System;
using System.Collections.Generic;
using System.Linq.Expressions;

namespace Core.Specifications
{
    public interface ISpecification<T>
    {
         Expression<Func<T, bool>> Criteria {get;}

         List<Expression<Func<T, object>>> Includes {get;}


        //  Sorting and Filtering
         Expression<Func<T, object>> OrderBy {get; }

         Expression<Func<T, object>> OrderByDescending {get; }

        // take certain amount of products for paging
         int Take { get; } 

         // skip certain amount of products for paging
         int Skip {get;}  
         bool IsPagingEnabled {get;}


    }
}