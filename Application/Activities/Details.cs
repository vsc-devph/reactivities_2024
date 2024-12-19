
using Application.Core;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Activities
{
    public class Details
    {
        public class Query : IRequest<Result<ActivityDto>>
        {
            public Guid Id { get; set; }
        }

        public class Handler : IRequestHandler<Query, Result<ActivityDto>>
        {
            private readonly DataContext __dataContext;
            private readonly IMapper _mapper;
            public Handler(DataContext _dataContext, IMapper mapper)
            {
                _mapper = mapper;
                __dataContext = _dataContext;

            }
            public async Task<Result<ActivityDto>> Handle(Query request, CancellationToken cancellationToken)
            {
                var activity = await __dataContext.Activities
                        .ProjectTo<ActivityDto>(_mapper.ConfigurationProvider) 
                        .FirstOrDefaultAsync(x=> x.Id == request.Id);

                return Result<ActivityDto>.Success(activity);
            }
        }
    }
}