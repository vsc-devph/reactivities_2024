
using Application.Core;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Activities
{
    public class Details
    {
        public class Query: IRequest<Result<Activity>>
        {
            public Guid Id { get; set; }
        }

        public class Handler : IRequestHandler<Query, Result<Activity>>
        {
            private readonly DataContext __dataContext;
            public Handler(DataContext _dataContext)
            {
            __dataContext = _dataContext;
                
            }
            public async Task<Result<Activity>> Handle(Query request, CancellationToken cancellationToken)
            {
                var activity = await __dataContext.Activities.FindAsync(request.Id);
                return Result<Activity>.Success(activity);
            }
        }
    }
}