using Application.Core;
using Application.Interfaces;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Photos
{
    public class Delete
    {
        public class Command : IRequest<Result<Unit>>
        {
            public string Id { get; set; }
        }

        public class Handler : IRequestHandler<Command, Result<Unit>>
        {
            private readonly DataContext _dataContext;
            private readonly IPhotoAccesssor _photoAccesssor;
            private readonly IUserAccessor _userAccessor;

            public Handler(DataContext dataContext, IPhotoAccesssor photoAccesssor, IUserAccessor userAccessor)
            {
                _userAccessor = userAccessor;
                _photoAccesssor = photoAccesssor;
                _dataContext = dataContext;
            }

            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                var user = await _dataContext.Users.Include(p => p.Photos)
                .FirstOrDefaultAsync(x => x.UserName == _userAccessor.getUsername());

                if (user == null) return null;

                var photo = user.Photos.FirstOrDefault(x => x.Id == request.Id);

                if (photo == null) return null;

                if (photo.IsMain) return Result<Unit>.Failure("You can not delete main photo");

                var result = await _photoAccesssor.DeletePhoto(photo.Id);

                if (result == null)
                    return Result<Unit>.Failure("Problem deleting photo from Cloudinary.");

                user.Photos.Remove(photo);

                var success = await _dataContext.SaveChangesAsync() > 0;

                if (success) return Result<Unit>.Success(Unit.Value);

                return Result<Unit>.Failure("Problem deleting photo from API.");

            }
        }
    }
}