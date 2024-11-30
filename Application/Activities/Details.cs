
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Activities
{
    public class Details
    {
        public class Query: IRequest<Activity>
        {
            public Guid Id { get; set; }
        }

        public class Handler : IRequestHandler<Query, Activity>
        {
            private readonly DataContext __dataContext;
            public Handler(DataContext _dataContext)
            {
            __dataContext = _dataContext;
                
            }
            public async Task<Activity> Handle(Query request, CancellationToken cancellationToken)
            {
                return await __dataContext.Activities.FindAsync(request.Id);
            }
        }
    }
}