import socket
import sys

# 명령어 인자로 IP, Port, 파일명을 받음
if len(sys.argv) != 4:
    print("Usage: python client.py <host> <port> <file_name>")
    sys.exit(1)

host = sys.argv[1]
port = int(sys.argv[2])
file_name = sys.argv[3]

# 소켓 생성
client_socket = socket.socket(socket.AF_INET, socket.SOCK_STREAM)

# 서버에 연결
client_socket.connect((host, port))

# GET 요청 생성
request = f"GET /{file_name} HTTP/1.1\r\nHost: {host}\r\n\r\n"

# 서버에 요청 전송
client_socket.sendall(request.encode())

# 서버 응답 받기
response = client_socket.recv(4096)

# 응답 출력
print(response.decode())

# 소켓 닫기
client_socket.close()
