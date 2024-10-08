use port_scanner::local_port_available;
use std::net::SocketAddr;

pub const SERVER_PORTS: [u16; 3] = [44212, 23212, 44331];

pub fn get_available_socket_addr() -> SocketAddr {
    for port in SERVER_PORTS {
        if local_port_available(port) {
            return SocketAddr::from(([127, 0, 0, 1], port));
        }
    }

    panic!("No available port found")
}
