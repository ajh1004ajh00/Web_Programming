import socket
import os

# 서버 설정
HOST = '0.0.0.0'  # 모든 인터페이스에서 접속 허용
PORT = 6789  # 주어진 포트 번호

def handle_request(client_connection):
    request = client_connection.recv(1024).decode()  # 요청 수신
    print(request)  # 요청 내용을 콘솔에 출력 (디버깅용)
    
    # 요청된 파일명 추출
    headers = request.split('\n')
    requested_file = headers[0].split()[1][1:]  # 첫 번째 줄에서 파일명 추출
    
    # HTML 파일이 존재하는지 확인
    if os.path.exists(requested_file):
        with open(requested_file, 'r', encoding='utf-8') as file:
            response_body = file.read()
        response_header = 'HTTP/1.1 200 OK\r\n'
    else:
        response_body = "<h1>404 Not Found</h1>"
        response_header = 'HTTP/1.1 404 Not Found\r\n'

    response_header += 'Content-Type: text/html; charset=utf-8\r\n\r\n'
    response = response_header + response_body
    
    client_connection.sendall(response.encode())  # 응답 전송
    client_connection.close()  # 연결 종료

def start_server():
    # 소켓 설정 및 바인딩
    server_socket = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    server_socket.bind((HOST, PORT))
    server_socket.listen(1)
    print(f"HTTP 서버가 {HOST}:{PORT}에서 실행 중입니다...")

    while True:
        client_connection, client_address = server_socket.accept()  # 클라이언트 연결 수락
        handle_request(client_connection)  # 요청 처리

if __name__ == '__main__':
    start_server()
