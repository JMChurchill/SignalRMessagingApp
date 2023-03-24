using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ChatDataTypes.DTOs
{
    public class UserConnectionDTO
    {
        public string Token { get; set; } = null!;
        public int RoomId { get; set; }
    }
}
